import { HubConnectionBuilder } from "@microsoft/signalr";
import { useState, useEffect } from "react";

export default function useSignalr(hubUrl, subscriptions) {
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);
  useEffect(() => {
    if (!connection) return;

    for(const subscriptionKey in subscriptions) {
      connection.on(subscriptionKey, subscriptions[subscriptionKey]);
      
    console.log('subscribed to: ', subscriptionKey);
    }

    connection.start().then(() => console.log('connection started'));
  }, [connection]);
}