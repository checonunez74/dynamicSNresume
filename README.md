# Reqct app for dynamic Resume

This project is design to portrait the way you can connect a NRDB from Firebase to a ReactJS application.

## Code composition

In the project 

### `left panel`

	1.	Component Structure
	•	The component has a div with the class name styles.dataDisplay, which likely serves as a container for the entire layout, including the menu.
	•	The title (from props.title) is rendered as an <h1> element.
	2.	Dynamic Rendering of Menu Items
	•	The left menu items (e.g., Consultant, Summary, Education, etc.) are dynamically generated based on the data prop passed to the component.
	•	The line Object.entries(data).map(([key, content]) => (...) iterates over the data object, where:
	•	key represents the name of the section (e.g., Consultant, Summary, etc.).
	•	content represents the associated content for that section (details like email, LinkedIn, etc.).
	3.	Section Content Rendering
	•	For each section, the function renderSectionsContent(key, content) is called, which generates the content of that section.
	•	This ensures that each section’s display logic is abstracted within the renderSectionsContent function.
	4.	Logging for Debugging
	•	A console.log statement is added to debug when renderSectionsContent is executed, verifying that the section content is rendered correctly.
	5.	Class-based Styling
	•	The use of styles.dataDisplay and styles.title indicates that CSS modules are being used for styling. These classes likely define the layout and style for the menu on the left and the title.