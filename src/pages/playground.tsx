import React, { useState } from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import useWindowSize from "@site/src/hooks/useWindowSize";
import Monaco from "@site/src/components/Monaco";
import styles from "./styles.module.css";
import { ExecutionState } from "../ExecutionState";
import { copyShareUrl, runBeaconCode } from "../utils";
import { DAppClient } from "@airgap/beacon-sdk";

const defaultCode = `import { DAppClient } from "@airgap/beacon-sdk";

// Create a new DAppClient instance
const dAppClient = new DAppClient({ name: 'Beacon Docs' })

const activeAccount = await dAppClient.getActiveAccount()
if (activeAccount) {
    // User already has account connected, everything is ready
    // You can now do an operation request, sign request, or send another permission request to switch wallet
    console.log('Already connected:', activeAccount.address)
    return activeAccount
} else {
    const permissions = await dAppClient.requestPermissions()
    console.log('New connection:', permissions.address)
    return permissions
}`;

function Playground() {
  if (typeof window === "undefined") {
    return null;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const initialCode = urlParams.has("code")
    ? atob(urlParams.get("code"))
    : defaultCode;

  const [input, setInput] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [executionState, setExecutionState] = useState(ExecutionState.INIT);

  const windowSize = useWindowSize();

  const inputChanged = (str) => {
    setInput(str);
  };

  const headerLayout = {
    height: 100,
  };

  const editorWidthRatio = 3 / 5;
  const editorLayout = {
    xs: {
      width: windowSize.width,
      height: 200,
    },
    lg: {
      width: editorWidthRatio * windowSize.width,
      height: windowSize.height - headerLayout.height,
    },
  };

  const outputLayout = {
    xs: {
      width: windowSize.width,
      height: windowSize.height - headerLayout.height - editorLayout.xs.height,
    },
    lg: {
      width: (1 - editorWidthRatio - 0.05) * windowSize.width,
      height: windowSize.height,
    },
  };

  const execute = async () => {
    if (executionState === ExecutionState.STARTED) {
      return;
    }
    await clear();
    setExecutionState(ExecutionState.STARTED);
    await runBeaconCode(input, setOutput);
    setExecutionState(ExecutionState.ENDED);
  };
  const reset = async () => {
    clear();
    const dAppClient = new DAppClient({ name: "Cleanup" });
    await dAppClient.destroy();
  };
  const clear = async () => {
    setOutput("");
    setExecutionState(ExecutionState.INIT);
  };

  function handleSubmit(e) {
    e.preventDefault();
    execute();
  }

  function handleClickShare() {
    copyShareUrl(input);
  }

  return (
    <Layout title="Beacon" description="Beacon Playground" noFooter={true}>
      <div className={classnames(styles.headerContainer)}>
        <form
          onSubmit={handleSubmit}
          className={classnames(styles.argsInputContainer)}
        >
          <button
            onClick={execute}
            className={classnames(styles.argsIconContainer)}
          >
            Run Code
          </button>
          <button
            onClick={reset}
            className={classnames(styles.argsIconContainer)}
          >
            Reset
          </button>
          <button
            onClick={clear}
            className={classnames(styles.argsIconContainer)}
          >
            Clear Output
          </button>
        </form>
        <button onClick={handleClickShare}>
          Share Code (Copy to Clipboard)
        </button>
      </div>

      <div className={classnames(styles.row)}>
        <Monaco
          {...(windowSize.width > 600 ? editorLayout.lg : editorLayout.xs)}
          language="typescript"
          value={input}
          onChange={inputChanged}
          options={{ minimap: { enabled: false }, wordWrap: "on" }}
        />
        <Monaco
          {...(windowSize.width > 600 ? outputLayout.lg : outputLayout.xs)}
          language="bash"
          value={output}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            wordWrap: "on",
          }}
        />
      </div>
    </Layout>
  );
}

export default Playground;
