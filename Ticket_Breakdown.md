# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Guesses
- The tables `facility` and `agent` have BIGINT id columns as primary keys.
- The Facility custom ID has no defined format, so, it can be a string with any size;
- The report generated has a table format

### Ticket 1
#### Description
Create a database table to store the Facility's Agent custom IDs and relate them to the internal Agents IDs.
#### Acceptance Criteria
A table called `facility_custom_agents` must be created with the following structure:
- `facility_id` BIGINT NOT NULL 
  - foreign key to `facility.id`
- `agent_id` BIGINT NOT NULL
  - foreign key to `agent.id`
- `custom_id` TEXT NOT NULL
- PRIMARY KEY (`facility_id`, `agent_id`)
#### Estimation
1 hour

### Ticket 2
#### Description
Create the `saveCustomIdByAgent` function to store the Facility's Agent custom id
#### Acceptance Criteria
The function created should add/update rows in the `facility_custom_agents` table;
#### Implementation Details
- The function must accept 3 required input arguments
  - factory_id
  - agent_id
  - custom_id
- If a record with the same `factory_id` and `agent_id` already exists, update the custom_id of this record. Otherwise, add a new record.
#### Estimation
4 hours

### Ticket 3
#### Description
Update the `generateReport` function to include the Facility's Agent custom id to the report
#### Acceptance Criteria
A new column should be added to the generated report containing the existent Facility's Agent custom id. 
#### Implementation Details
- Add a column `Custom Agent ID` to the Agent's metadata section on the report
  - Display the data from `facility_custom_agents.custom_id` database column
#### Estimation
4 hours