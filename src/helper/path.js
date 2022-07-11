export const PATH_LIST = {
  LIST: "List",
  DETAIL: "",
  EDIT: "Edit",
  EDIT_CONFIRM: "EditConfirm",
  EDIT_COMPLETE: "EditComplete",
  REGISTER: "Register",
  REGISTER_COMPLETE: "RegisterComplete",
  INVITE: "Invite",
  DOWNLOAD: "Download",
  // UPLOAD: "Upload"
};

export function buildPath(namespace) {
  return Object.entries(PATH_LIST).reduce((pathMapping, [type, value]) => {
    const mapping = pathMapping;
    mapping[type] = `/${namespace}${value}`;
    return mapping;
  }, {});
}
