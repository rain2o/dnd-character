/**
 * Send anonymous packet to Google Analytics
 * Thanks to @DasSurma https://twitter.com/DasSurma
 * and to @timbenniks https://twitter.com/timbenniks/status/1360197460031770626
 * for this minimal and anonymous approach.
 * @param data Optional additional data to send
 */
export default (data?: string[][] | Record<string, string> | URLSearchParams) => {
  navigator.sendBeacon(
    'https://google-analytics.com/collect',
    new URLSearchParams({
      ...{
        v: '1',
        tid: process.env.VUE_APP_GA_ID,
        cid: `${Date.now()}${Math.random()}`,
        dl: window.location.href,
        ua: navigator.userAgent,
        dr: document.referrer || '',
        sr: `${window.screen.width}x${window.screen.height}`,
        vp: `${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`,
        sd: `${window.screen.pixelDepth}-bits`,
        ul: navigator.language,
      },
      ...data,
    }).toString(),
  );
};
