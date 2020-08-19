import { Collection, Document } from "firestorter";
import { struct } from "superstruct";

class UserConfig extends Document {
  constructor(source, options) {
    super(source, {
      ...(options || {}),
      schema: struct({
        user: "string?"
      })
    });
  }
}

const UserConfigStore = new Collection("cats", {
  DocumentClass: UserConfig
});

export { UserConfigStore };
