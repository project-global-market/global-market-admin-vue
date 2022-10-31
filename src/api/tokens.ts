const LOCAL_ACCESS_NAME = 'auth_accessToken';
const LOCAL_ACCESS_EXP = 'auth_accessExp';

function setTokens(access: string) {
  const accessData = getJWTPayload(access);
  localStorage.setItem(LOCAL_ACCESS_NAME, access);
  localStorage.setItem(LOCAL_ACCESS_EXP, accessData.exp);
}

function cleanTokensData() {
  localStorage.removeItem(LOCAL_ACCESS_NAME);
  localStorage.removeItem(LOCAL_ACCESS_EXP);
}

function getAccessToken() {
  return localStorage.getItem(LOCAL_ACCESS_NAME);
}

function getJWTPayload(token: string) {
  return parseJWT(token).payload;
}

function parseJWT(token: string) {
  const parts = token.split('.');

  return {
    header: parsePart(parts[0]),
    payload: parsePart(parts[1]),
    sign: parts[2],
  };
}

function parsePart(str: string) {
  return JSON.parse(atob(str));
}

export { setTokens, cleanTokensData, getJWTPayload, getAccessToken };
