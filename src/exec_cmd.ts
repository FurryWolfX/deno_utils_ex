import { iter } from "https://deno.land/std@0.94.0/io/util.ts";

export async function execCmd(cmd: string[], opt?: {
  stdout?: (str: string) => void;
  stderr?: (str: string) => void;
}) {
  // create subprocess
  const p = Deno.run({
    cmd: [...cmd],
    stdout: "piped",
    stderr: "piped",
  });

  if (opt?.stdout) {
    for await (const buffer of iter(p.stdout)) {
      const str = new TextDecoder().decode(buffer);
      opt.stdout(str);
    }
  }

  if (opt?.stderr) {
    for await (const buffer of iter(p.stderr)) {
      const str = new TextDecoder().decode(buffer);
      opt.stderr(str);
    }
  }
 
  // await its completion
  return await p.status();
}
