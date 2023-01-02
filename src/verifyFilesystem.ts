import fs from "fs";

(function verifyFilesystem() {
  const assertDirs = ["./logs/test", "./.data"];

  for (const dir of assertDirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(dir)) {
      throw new Error(`Filesystem is invalid, and could not be corrected (${dir})`);
    }
  }
})();