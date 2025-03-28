import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
  InlineGrid,
  Divider,
  TextField,
  useBreakpoints,
  Button,

} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
import { json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";

// import db from routes
import db from "../db.server";

export async function loader() {
  // provides data to the component
  // get data from database

  let settings = await db.settings.findFirst();

    console.log("settings ------>", settings);

    return json(settings);
  }


export async function action({ request }) {
  // handles form submission
  let settings = await request.formData();
  settings = Object.fromEntries(settings);

  // update database
  await db.settings.upsert({
    where: {
       id: '1'
    },
    update: {
      id: '1',
      name: settings.name,
      description: settings.description,
    },
    create: {
      id: '1',
      name: settings.name,
      description: settings.description,
    }
  });
  
  // updates persistent data
  return json(settings);
}


export default function SettingsPage() {

  const settings = useLoaderData();

  const [formState, setFormState] = useState(settings);

  const { smUp } = useBreakpoints();
  return (
    <Page>
      <TitleBar title="Settings" />
      <Page
      divider
      // primaryAction={{ content: "View on your store", disabled: true }}
      // secondaryActions={[
      //   {
      //     content: "Duplicate",
      //     accessibilityLabel: "Secondary action label",
      //     onAction: () => alert("Duplicate action"),
      //   },
      // ]}
    >
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        {/* <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                InterJambs
              </Text>
              <Text as="p" variant="bodyMd">
                Interjambs are the rounded protruding bits of your puzzlie piece
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <BlockStack gap="400">
              <TextField label="Interjamb style" />
              <TextField label="Interjamb ratio" />
            </BlockStack>
          </Card>
        </InlineGrid> */}
        {smUp ? <Divider /> : null}
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Settings
              </Text>
              <Text as="p" variant="bodyMd">
                Update app settings and preferences.
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <Form method="POST">
            <BlockStack gap="400">
              <TextField label="App name" name = "name" value = {formState?.name} onChange={(value) => setFormState({...formState, name: value})} />
              <TextField label="App description" name = "description" value = {formState?.description} onChange={(value) => setFormState({...formState, description: value})} />
            
              <Button variant="primary" submit={true}>Save theme</Button> 
            </BlockStack>
            </Form>
          </Card>
        </InlineGrid>
      </BlockStack>
    </Page>
    </Page>
  );
}

function Code({ children }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}
