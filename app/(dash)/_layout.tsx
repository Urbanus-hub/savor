import { Stack,Tabs } from "expo-router";
import { StatusBar } from 'expo-status-bar';

export default function DashLayout() {
  return (<>
  <Tabs 
  screenOptions={
  {
    headerShown:false
  }
  }
  >
    
    </Tabs>
    <StatusBar style="dark"/>
  </>)
}
