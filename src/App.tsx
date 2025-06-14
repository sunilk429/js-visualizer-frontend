// Project scaffold for JavaScript Event Loop Simulator

import Editor from "@monaco-editor/react";
import { useState } from "react";

export default function App() {
  const [code, setCode] = useState(`// Write your JS code here
setTimeout(() => {
  console.log('Timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise');
});

console.log('Main thread');`);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="p-4 text-xl font-bold bg-gray-800">JS Event Loop Simulator</header>
      <div className="flex flex-1">
        {/* Code Editor */}
        <div className="w-1/2 border-r border-gray-700">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || "")}
          />
        </div>

        {/* Simulation Visualizer Panel */}
        <div className="w-1/2 p-4 space-y-4 overflow-auto">
          <h2 className="text-lg font-semibold">Simulation (MVP placeholder)</h2>
          <div className="p-2 bg-gray-800 rounded">Call Stack: [main, timeout]</div>
          <div className="p-2 bg-gray-800 rounded">Microtasks: [promise.then]</div>
          <div className="p-2 bg-gray-800 rounded">Macrotasks: [setTimeout]</div>
          <div className="p-2 bg-gray-800 rounded">Console Output:</div>
          <div className="pl-4">
            <pre>Main thread
              Promise
              Timeout</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
