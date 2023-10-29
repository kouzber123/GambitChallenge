import AccordionGroup from "@mui/joy/AccordionGroup";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionSummary from "@mui/joy/AccordionSummary";
import { List, ListItem } from "@mui/material";
import { ListItemContent } from "@mui/joy";

export default function AboutPageDetails() {
  return (
    <AccordionGroup
      sx={{ maxWidth: "100%", mt: 10 }}
      size="lg"
    >
      <Accordion>
        <AccordionSummary>About</AccordionSummary>
        <AccordionDetails>
          Thank you Atea Finland for giving such fun coding challenge!
          <List>
            <ListItem>
              <ListItemContent>
                In this app I used most of my programming knowledge, if you do find bugs please do tell me! I want to
                learn
              </ListItemContent>
            </ListItem>
            <ListItem>
              <ListItemContent>
                I combined the two challenges given by Atea to create fullstack application, I hope you dont mind!
              </ListItemContent>
            </ListItem>
            <ListItem>
              <ListItemContent>I hope this show cases my ability to adapt and to develop</ListItemContent>
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Challenge</AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <ListItemContent>
                This Coding challenge was to create fullstack project, that fetches data from the server and in order to
                view the data user has to first login or register.
              </ListItemContent>
            </ListItem>
            <ListItem>
              <ListItemContent>
                To create UX / UI friendly Interface to visualise data, create authentication.
              </ListItemContent>
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Technologies</AccordionSummary>
        <AccordionDetails>
          Technologies used Client side:
          <List>
            <ListItem>
              {" "}
              <ListItemContent>Vite.js</ListItemContent>
            </ListItem>
            <ListItem>
              {" "}
              <ListItemContent>TypeScript React</ListItemContent>
            </ListItem>
            <ListItem>
              {" "}
              <ListItemContent>Redux</ListItemContent>
            </ListItem>
            <ListItem>
              {" "}
              <ListItemContent>
                Axios and lot of other npm packges...because it silly to invent bike again
              </ListItemContent>
            </ListItem>
          </List>
          Technologies used on Server side:
          <List>
            <ListItem>
              {" "}
              <ListItemContent>.Net</ListItemContent>
            </ListItem>
            <ListItem>
              {" "}
              <ListItemContent>Entity Framework</ListItemContent>
            </ListItem>
            <ListItem>
              {" "}
              <ListItemContent>Aspnet</ListItemContent>
            </ListItem>
            <ListItem>
              {" "}
              <ListItemContent>
                And other Nuget libraries such as microsoft authentication and security.
              </ListItemContent>
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </AccordionGroup>
  );
}
