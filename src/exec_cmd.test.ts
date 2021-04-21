import { execCmd } from "./exec_cmd.ts";

execCmd(["ping", "www.baidu.com"], {
  stdout: str => {
    console.info(str);
  },
  stderr: str => {
    console.error(str);
  }
})