export default function issueJwt(user) {
  return strapi.plugins["users-permissions"].services.jwt.issue({
    id: user.id,
  });
}
