import { useEffect, useRef } from 'react';

const TRACKER_URL = 'https://visitor-tracker.shanujansh.workers.dev';

function getBrowser(ua: string): string {
  if (ua.includes('Edg')) return 'Edge';
  if (ua.includes('OPR') || ua.includes('Opera')) return 'Opera';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Safari')) return 'Safari';
  return 'Unknown';
}

function getOS(ua: string): string {
  if (ua.includes('Windows NT 10')) return 'Windows 10/11';
  if (ua.includes('Windows')) return 'Windows';
  if (ua.includes('Mac OS X')) return 'macOS';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
  if (ua.includes('Linux')) return 'Linux';
  return 'Unknown';
}

function getDevice(): string {
  const ua = navigator.userAgent;
  if (ua.includes('Mobi')) return 'Mobile';
  if (ua.includes('Tablet') || ua.includes('iPad')) return 'Tablet';
  return 'Desktop';
}

async function getCanvas(): Promise<string> {
  try {
    const c = document.createElement('canvas');
    const ctx = c.getContext('2d');
    if (!ctx) return 'unsupported';
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('ShanujanFP', 2, 2);
    return c.toDataURL().slice(-20);
  } catch { return 'blocked'; }
}

async function getFonts(): Promise<string> {
  const list = [
    'Arial','Courier New','Georgia','Times New Roman','Verdana',
    'Helvetica','Comic Sans MS','Impact','Trebuchet MS','Calibri',
    'Cambria','Consolas','Tahoma','Garamond','Palatino',
  ];
  const found: string[] = [];
  for (const f of list) {
    try {
      const loaded = await (document as any).fonts.load('12px "' + f + '"');
      if (loaded.length > 0) found.push(f);
    } catch {}
  }
  return found.join(', ') || 'none';
}

async function getAdBlocker(): Promise<string> {
  try {
    const d = document.createElement('div');
    d.className = 'ads ad adsbox';
    d.style.cssText = 'height:1px;width:1px;position:absolute;left:-9999px';
    document.body.appendChild(d);
    await new Promise(r => setTimeout(r, 100));
    const blocked = d.offsetHeight === 0;
    document.body.removeChild(d);
    return blocked ? 'Yes' : 'No';
  } catch { return 'unknown'; }
}

async function getGPU(): Promise<string> {
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl') as WebGLRenderingContext | null;
    if (!gl) return 'unsupported';
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    if (!ext) return 'blocked';
    return gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || 'unknown';
  } catch { return 'blocked'; }
}

const VisitorTracker: React.FC = () => {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;

    const sessionId = sessionStorage.getItem('sid') ||
      Math.random().toString(36).slice(2);
    sessionStorage.setItem('sid', sessionId);

    const ua = navigator.userAgent;
    const startTime = Date.now();

    // Behavior tracking
    let maxScroll = 0;
    const clicks: string[] = [];
    const zones = new Set<string>();

    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const pct = Math.round((window.scrollY / total) * 100);
      if (pct > maxScroll) maxScroll = pct;
    };

    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const tag = t.tagName;
      const id = t.id ? '#' + t.id : '';
      const cls = t.className && typeof t.className === 'string'
        ? '.' + t.className.trim().split(' ')[0] : '';
      clicks.push(tag + id + cls);
    };

    const onMouse = (e: MouseEvent) => {
      const zx = Math.floor(e.clientX / (window.innerWidth / 3));
      const zy = Math.floor(e.clientY / (window.innerHeight / 3));
      zones.add(zx + ':' + zy);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('click', onClick);
    window.addEventListener('mousemove', onMouse);

    const collect = async () => {
      // Battery
      let battery = 'unsupported';
      let charging = 'unsupported';
      try {
        const b = await (navigator as any).getBattery?.();
        if (b) {
          battery = Math.round(b.level * 100) + '%';
          charging = b.charging ? 'Yes' : 'No';
        }
      } catch {}

      const [canvasFp, fonts, adBlocker, gpu] = await Promise.all([
        getCanvas(),
        getFonts(),
        getAdBlocker(),
        getGPU(),
      ]);

      const payload = {
        deviceType:   getDevice(),
        os:           getOS(ua),
        browser:      getBrowser(ua),
        screen:       screen.width + 'x' + screen.height,
        colorDepth:   screen.colorDepth + '-bit',
        touchSupport: navigator.maxTouchPoints > 0 ? 'Yes' : 'No',
        battery,
        charging,
        cpuCores:     navigator.hardwareConcurrency || 'unknown',
        memory:       (navigator as any).deviceMemory || 'unknown',
        gpu,
        page:         window.location.pathname,
        referrer:     document.referrer || 'Direct',
        language:     navigator.language,
        sessionId,
        canvasFp,
        fonts,
        adBlocker,
        dnt:          navigator.doNotTrack || 'unset',
      };

      // Initial ping
      try {
        await fetch(TRACKER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch {}

      // Final ping on leave with behavior data
      const sendFinal = () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('click', onClick);
        window.removeEventListener('mousemove', onMouse);

        const final = Object.assign({}, payload, {
          scrollDepth:     maxScroll + '%',
          clickPatterns:   clicks.slice(0, 20).join(' > '),
          mouseZones:      Array.from(zones).join(', '),
          sessionDuration: Math.round((Date.now() - startTime) / 1000) + 's',
        });

        navigator.sendBeacon(
          TRACKER_URL,
          JSON.stringify(final)
        );
      };

      window.addEventListener('beforeunload', sendFinal);
    };

    setTimeout(collect, 1500);
  }, []);

  return null;
};

export default VisitorTracker;
