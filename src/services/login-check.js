import { redirect } from "react-router-dom";

export function handleLocalStorageChange(event) {
    //redirect to dashboard if token created
    console.log('event', event)
    if (event.type === 'storage') {
        console.log('LocalStorage item has changed:');
        return redirect("/dashboard")
      }
  }