module.exports = async function (context, req) {
  const url = req.body && req.body.url;

  if (!url) {
    context.res = {
      status: 400,
      body: { error: 'URL is required' },
    };
    return;
  }

  try {
    new URL(url);
  } catch {
    context.res = {
      status: 400,
      body: { error: 'Invalid URL format' },
    };
    return;
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        DNT: '1',
        Connection: 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Cache-Control': 'max-age=0',
      },
    });

    if (!response.ok) {
      context.res = {
        status: response.status,
        body: { error: `Failed to fetch URL: ${response.statusText}` },
      };
      return;
    }

    const html = await response.text();
    context.res = {
      status: 200,
      body: { html },
    };
  } catch (error) {
    context.log.error('Error fetching recipe:', error);
    context.res = {
      status: 500,
      body: { error: error.message },
    };
  }
};
