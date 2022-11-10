import log from "../logs";

export function saveUserInfo(profile: UserProfile, authData: AuthData) {
  log.info(`"saving" user info ${profile.id}, ${authData.access_token}`);
  //   let profile = JSON.parse(result.data.toString());
  //   putUser(profile.id, authData.access_token, authData.expires_in, authData.refresh_token);
  //   // db.putUser(profile.id, authData.access_token, expiry.toUTCString(), authData.refresh_token);
  //   req.session.userid = profile.id;
  //   res.redirect("/");
  // })
  //   .catch (err => {
  //   log.error("Failed to get spotify profile: ", err);
  // });
}