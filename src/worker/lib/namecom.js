const NAMECOM_API = 'https://api.name.com/v4';

function getAuth(env) {
  const username = env.NAMECOM_USERNAME;
  const token = env.NAMECOM_TOKEN;
  return 'Basic ' + btoa(username + ':' + token);
}

export async function searchNamecom(domain, env) {
  try {
    const response = await fetch(`${NAMECOM_API}/domains:search`, {
      method: 'POST',
      headers: {
        'Authorization': getAuth(env),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ domainName: domain })
    });

    const data = await response.json();
    return { success: true, available: data.available, price: data.pricing };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function registerNamecom(domain, years, contact, env) {
  try {
    const response = await fetch(`${NAMECOM_API}/domains`, {
      method: 'POST',
      headers: {
        'Authorization': getAuth(env),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        domainName: domain,
        years,
        contacts: contact,
        nameServers: [
          'hector.ns.cloudflare.com',
          'iris.ns.cloudflare.com'
        ]
      })
    });

    const data = await response.json();
    return { success: !!data.domainName, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
