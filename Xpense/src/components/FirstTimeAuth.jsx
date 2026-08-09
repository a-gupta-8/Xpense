import { useState } from 'react';

async function signIn({ supabase, username, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: username,
    password,
  });

  if (error) {
    console.error(error.message);
    return;
  }

  console.log("Logged in:", data.session);
}

function FirstTimeAuth({ supabase }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div class="flex flex-col items-center justify-center gap-4 p-8 bg-mauve-200 rounded-lg shadow-md">
            <h1 class="text-4xl font-bold font-mono">Welcome to Xpense!</h1>
            <p class="font-mono">Please sign in to continue.</p>
            <p class="font-mono">Username</p>
            <input class="bg-mauve-100 text-black placeholder:text-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mauve-500 font-mono" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <p class="font-mono">Password</p>
            <input class="bg-mauve-100 text-black placeholder:text-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mauve-500 font-mono" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button class="bg-mauve-500 hover:bg-mauve-700 text-white font-bold py-2 px-4 rounded" onClick={() => signIn({ supabase, username, password })}>Sign In</button>
            
        </div>
    );
}

export default FirstTimeAuth;