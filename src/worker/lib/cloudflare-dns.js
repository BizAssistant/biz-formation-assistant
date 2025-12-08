const CF_API = 'https://api.cloudflare.com/client/v4';

export async function createDNSRecord(domain, record, env) {
  try {
    const zoneId = env.CLOUDFLARE_ZONE_ID;
    const response = await fetch(`${CF_API}/zones/${zoneId}/dns_records`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: record.type,
        name: record.name,
        content: record.content,
        ttl: record.ttl || 3600
      })
    });

    const data = await response.json();
    return { success: data.success, data: data.result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function listDNSRecords(domain, env) {
  try {
    const zoneId = env.CLOUDFLARE_ZONE_ID;
    const response = await fetch(`${CF_API}/zones/${zoneId}/dns_records`, {
      headers: {
        'Authorization': `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    return data.result || [];
  } catch (error) {
    return { error: error.message };
  }
}

export async function deleteDNSRecord(recordId, env) {
  try {
    const zoneId = env.CLOUDFLARE_ZONE_ID;
    const response = await fetch(`${CF_API}/zones/${zoneId}/dns_records/${recordId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    return { success: data.success };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
