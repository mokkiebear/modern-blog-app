import React, { useState, useEffect } from "react";
import type { AppProps } from "next/app";

import { Layout } from "../components";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
