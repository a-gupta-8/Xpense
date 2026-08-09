import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import FirstTimeAuth from './components/FirstTimeAuth.jsx'
import ExpenseApp from './components/ExpenseApp.jsx'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
)

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  //if (!session) {
  //  return <FirstTimeAuth supabase={supabase} />;
  //}

  return <ExpenseApp supabase={supabase} />;
}

export default App;