interface Alias {
  targetUser: string;
  targetHost: string;
}

const aliases: Record<string, Alias> = {
  me: {
    targetUser: "jleight",
    targetHost: "infosec.exchange",
  },
};

const resourceParser = /^acct:([^@]+)@(.+)$/;

export default {
  async fetch(request: Request): Promise<Response> {
    const { hostname, searchParams } = new URL(request.url);

    const resource = searchParams.get("resource") || "";
    const [success, user, host] = resourceParser.exec(resource) ?? [];

    if (!success || host !== hostname || !aliases[user]) {
      return new Response("Resource not found.", {
        status: 404,
      });
    }

    const { targetUser, targetHost } = aliases[user];

    const response = {
      subject: `acct:${user}@${hostname}`,
      aliases: [
        `https://${targetHost}/@${targetUser}`,
        `https://${targetHost}/users/${targetUser}`,
      ],
      links: [
        {
          rel: "http://webfinger.net/rel/profile-page",
          type: "text/html",
          href: `https://${targetHost}/@${targetUser}`,
        },
        {
          rel: "self",
          type: "application/activity+json",
          href: `https://${targetHost}/users/${targetUser}`,
        },
        {
          rel: "http://ostatus.org/schema/1.0/subscribe",
          template: `https://${targetHost}/authorize_interaction?uri={uri}`,
        },
      ],
    };

    return new Response(JSON.stringify(response), {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
  },
};
