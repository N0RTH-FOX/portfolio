const noteId = "ot1009"
export async function onRequest(context) {
  // 1. あなたのnoteのRSS URL（ユーザーID部分を書き換えてください）
  const noteRssUrl = 'https://note.com/' + noteId + "/rss";

  const cacheUrl = new URL(context.request.url);
  const cacheKey = new Request(cacheUrl.toString(), context.request);
  const cache = caches.default;

  // 2. キャッシュがあればそれを返す（高速化＆相手サーバーの負荷軽減）
  let response = await cache.match(cacheKey);
  if (response) {
    return response;
  }

  try {
    // 3. noteのRSSを取得
    const res = await fetch(noteRssUrl, {
      headers: {
        'User-Agent': 'CloudflarePagesRSSProxy/1.0',
      },
    });

    if (!res.ok) {
      return new Response('noteからのRSS取得に失敗しました', { status: res.status });
    }

    const rssText = await res.text();

    // 4. レスポンスの作成（同ドメインから叩くため、CORSヘッダーは不要）
    response = new Response(rssText, {
      headers: {
        'Content-Type': 'application/xml; charset=UTF-8',
        // 1時間（3600秒）ブラウザとCloudflareエッジにキャッシュさせる指示
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });

    // キャッシュに保存して次回の高速返却に備える
    context.waitUntil(cache.put(cacheKey, response.clone()));

    return response;
  } catch (error) {
    return new Response('サーバーエラーが発生しました', { status: 500 });
  }
}
