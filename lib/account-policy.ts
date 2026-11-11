export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return Boolean(origin && origin === new URL(request.url).origin);
}
export function localNext(value: string | null | undefined) {
  return value && /^\/(?!\/)/.test(value) && !/[\\\r\n]/.test(value)
    ? value
    : "/account";
}
export function isParticipant(
  userId: string,
  customerId: string,
  providerOwner: string | null,
) {
  return userId === customerId || userId === providerOwner;
}
export const uuid =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
