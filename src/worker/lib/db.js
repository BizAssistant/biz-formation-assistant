export async function queryDB(env, sql, params = []) {
  try {
    const stmt = env.DB.prepare(sql);
    const result = stmt.bind(...params).all();
    return result.results || [];
  } catch (error) {
    console.error('DB Error:', error);
    throw error;
  }
}
