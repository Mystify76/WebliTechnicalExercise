import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { getApolloClient } from "./apolloClient/apolloClient.config";
import { Theme } from "theme";
import "./App.css";
import { Loading } from "./components/Loading";
import { Home } from "./Home/Home";

function App() {
  const [client, setClient] = useState<ApolloClient<any> | null>(null);

  useEffect(() => {
    const doSetClient = async () => setClient(await getApolloClient());
    void doSetClient().then(() => null);
  }, []);

  if (!client) return <Loading size="fullScreen" />;

  return (
    <StyledEngineProvider injectFirst>
      <ApolloProvider client={client}>
        <Theme>
          <Router>
            <Routes>
              <Route path="*" element={<Home />} />
            </Routes>
          </Router>
        </Theme>
      </ApolloProvider>
    </StyledEngineProvider>
  );
}

export default App;
