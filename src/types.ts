export interface TimelyClientOptions {
  /** Default: https://api.timelyapp.com/1.1 */
  apiUrl?: string;
  /** The account id if you don't want to provide it to every method */
  accountId?: number;
  accessToken: string;
}

// Common
export interface AccountSpecificOptions {
  account_id?: number;
}

export interface ProjectSpecificOptions {
  project_id: number;
}

export interface UserSpecificOptions {
  user_id: number;
}

export interface OffsetLimitPaginationOptions {
  limit?: number;
  offset?: number;
}

export interface PagePaginationOptions {
  /** Page size */
  per_page?: number;

  /** Page number */
  page?: number;
}

export interface OrderingOptions {
  order?: string;
}

export interface FilterOptions {
  filter?: string;
}
// /Common

// Acounts
export interface GetAccountsOptions {}

export interface GetAccountOptions {
  /** The ID of the account you want to retrieve */
  id?: number;
}
export interface GetActivitiesOptions
  extends AccountSpecificOptions,
    OffsetLimitPaginationOptions,
    OrderingOptions,
    FilterOptions {
  /** The ID of the account you want to retrieve */
  account_id?: number;

  /** Retrieve activities from offset */
  offset?: number;

  /** Retrieve a limited number of activities */
  limit?: number;

  /** Sorting order on created_at */
  order?: string;

  /** Filter activities by entity_type - Ex: filter=projects */
  filter?: string;
}
// /Accounts

// Clients
export interface GetClientsOptions extends AccountSpecificOptions, OffsetLimitPaginationOptions {
  /** Account ID for the clients you want to retrieve */
  account_id?: number;

  /** Retrieve clients from offset */
  offset?: number;

  /** Retrieve number of clients */
  limit?: number;

  /** Specifies which records to retrieve. The default shows a current account’s active clients (show=active). Example: "show=all" or "show=active" or "show=archived" */
  show?: string;
}

export interface GetClientOptions extends AccountSpecificOptions {
  /** Account ID for the client you want to retrieve */
  account_id?: number;

  /** Client ID to retrieve */
  id: string;
}

// export interface CreateClientOptions extends AccountSpecificOptions {
//   /** Account ID for the client you want to create */
//   account_id?: number;

//   /** Specifies the client name */
//   name: string;

//   /** Example values: "true" or "false". Using "false" changes the client state to "archived" */
//   active?: boolean;

//   /** The external_id can be used to reference external resource IDs to Timely resources, and should be alphanumeric (max. 512 characters) */
//   externalId?: string | number | null;
// }

// export interface UpdateClientOptions extends AccountSpecificOptions {
//   /** Account ID for the client you want to update */
//   account_id?: number;

//   /** Client ID */
//   id: string;

//   /** Specifies the client name */
//   name: string;

//   /** Example values: “true” or “false”. Using “false” changes the client state to “archived” */
//   active?: boolean;

//   /** The external_id can be used to reference external resource IDs to Timely resources, and should be alphanumeric (max. 512 characters) */
//   externalId?: string | number | null;
// }
// /Clients

// Events
interface BaseEventsOptions {
  /** Specifies the day date for returned results. Example: day=2014-08-24 */
  day?: string;

  /** Specifies the start date for returned results. Example: since=2014-08-18 */
  since?: string;

  /** Specifies the end date for returned results. Example: upto=2014-08-24 */
  upto?: string;

  /** Specifies which records to retrieve (Default logged). Example: filter=logged or filter=all */
  filter?: string;

  /** Field to sort projects by (Default updated_at) */
  sort?: string;

  /** Order to retrieve records (Default updated_at DESC) */
  order?: string;

  /** Records per page (Default 100) */
  per_page?: number;

  /** Page number (Default 1) */
  page?: number;
}

export interface GetEventsOptions
  extends AccountSpecificOptions,
    PagePaginationOptions,
    BaseEventsOptions {
  /** Account ID for the events you want to retrieve */
  account_id?: number;
}

export interface GetProjectEventsOptions
  extends AccountSpecificOptions,
    ProjectSpecificOptions,
    PagePaginationOptions,
    BaseEventsOptions {
  /** Account ID for the events you want to retrieve */
  account_id?: number;

  /** Project ID for the events you want to retrieve */
  project_id: number;
}

export interface GetUserEventsOptions
  extends AccountSpecificOptions,
    UserSpecificOptions,
    PagePaginationOptions,
    BaseEventsOptions {
  /** Account ID for the events you want to retrieve */
  account_id?: number;

  /** user_id ID for the events you want to retrieve */
  user_id: number;
}

export interface GetEventOptions extends AccountSpecificOptions {
  /** Account ID for the event you want to retrieve */
  account_id?: number;

  /** Event ID */
  id: number;
}
// /Events

// Labels
export interface GetLabelsOptions extends AccountSpecificOptions, OffsetLimitPaginationOptions {
  /** Account ID for the labels you want to retrieve */
  account_id?: number;

  /** Retrieve activities from offset */
  offset?: number;

  /** Retrieve a limited number of activities */
  limit?: number;

  /** Specifies which records to retrieve. The default shows a current workspace’s all labels (filter=all). Example: "filter=all" or "filter=active" or "filter=archived" */
  filter?: string;
}

export interface GetChildLabelsOptions
  extends AccountSpecificOptions,
    OffsetLimitPaginationOptions {
  /** Account ID for the labels you want to retrieve */
  account_id?: number;

  /** The parent ID whose children you want to retrieve */
  parentId: number;
}

export interface GetLabelOptions extends AccountSpecificOptions {
  /** Account ID for the labels you want to retrieve */
  account_id?: number;

  /** The ID of the label you want to retrieve */
  id: number;
}
// /Labels

// Permissions
export interface GetCurrentUserPermissionsOptions extends AccountSpecificOptions {
  /** Account ID for which current user's permissions are to be retrieved */
  account_id?: number;
}

export interface GetUserPermissionsOptions extends AccountSpecificOptions {
  /** Account ID for which current user's permissions are to be retrieved */
  account_id?: number;

  /** User whose permissions are required */
  user_id: number;
}
// /Permissions

// Projects
export interface GetProjectsOptions
  extends AccountSpecificOptions,
    OffsetLimitPaginationOptions,
    OrderingOptions {
  /** Account ID for which current user's projects are to be retrieved */
  account_id?: number;

  /** Retrieve projects from offset */
  offset?: number;

  /** Retrieve a limited number of projects */
  limit?: number;

  /** Field to sort projects by (Default updated_at) */
  sort?: string;

  /** Sorting order (Default desc) */
  order?: string;

  /** Filter projects - mine, active, archived, all (Default mine) */
  filter?: string;

  /** Retrieve records updated after a certain timestamp */
  updated_after?: string;

  /** Retrieve specific projects */
  project_ids?: number | number[];
}

export interface GetProjectOptions extends AccountSpecificOptions {
  /** Account ID for which current user's projects are to be retrieved */
  account_id?: number;

  /** The ID of the project you want to retrieve
   */
  id?: number;
}
// /Projects

// Reports
export interface GetReportsOptions extends AccountSpecificOptions {
  /** Account ID for which current user's reports are to be retrieved */
  account_id?: number;

  /** Specifies the users for which you want reports. Numerical user IDs should separated by a comma, like so: "user_ids": "175551,117861" */
  user_ids?: number | number[];

  /** Specifies the projects for which you want reports. Numerical project IDs should be separated by a comma, like so: "project_ids": "1751,1171" */
  project_ids?: number | number[];

  /** Specifies the labels pertaining to a report you want to see. Numerical label IDs should be separated by a comma, like so: "label_ids": "751,117" */
  label_ids?: number | number[];

  /** Specifies the start date for a report: For example: "since" : "Jan 01, 2014" */
  since?: string;

  /** Specifies the end date for a report. For example: "until" : "Dec 31, 2014" */
  until?: string;

  /** Specifies whether you want to report to show estimated or billed events. For example: "billed": false or "billed": true */
  billed?: boolean;
}

export interface GetFilterReportsOptions
  extends AccountSpecificOptions,
    OffsetLimitPaginationOptions,
    GetReportsOptions {
  /** Account ID for which current user's reports are to be retrieved */
  account_id?: number;

  /** Specifies the users for which you want reports. Numerical user IDs should separated by a comma, like so: "user_ids": "175551,117861" */
  user_ids?: number | number[];

  /** Specifies the projects for which you want reports. Numerical project IDs should be separated by a comma, like so: "project_ids": "1751,1171" */
  project_ids?: number | number[];

  /** Specifies the labels pertaining to a report you want to see. Numerical label IDs should be separated by a comma, like so: "label_ids": "751,117" */
  label_ids?: number | number[];

  /** Specifies the start date for a report: For example: "since" : "Jan 01, 2014" */
  since?: string;

  /** Specifies the end date for a report. For example: "until" : "Dec 31, 2014" */
  until?: string;

  /** Specifies whether you want to report to show estimated or billed events. For example: "billed": false or "billed": true */
  billed?: boolean;

  /** Specifies the team IDs of the hours you want to retrieve. Team IDs should be a numerical array, like so: team_ids: [3, 4, 2] */
  team_ids?: number | number[];

  /** Specifies how to group the hours. Default: group_by: ["clients", "users", "labels", "days", "teams"] */
  group_by?: string[];

  /** Retrieve events only. For example: 'scope=events' */
  scope?: string;

  /** Retrieve locked hours only. Example: locked=true */
  locked?: boolean;

  /** Retrieve records from offset (Default 0) */
  offset?: number;

  /** Retrieve number of records. Max 100 records */
  limit?: number;

  /** Page number (Default 1) */
  page?: number;
}
// /Reports

// Roles
export interface GetRolesOptions extends AccountSpecificOptions {
  /** Account ID for which roles are to be retrieved */
  account_id?: number;
}
// /Roles

// Teams
export interface GetTeamsOptions
  extends AccountSpecificOptions,
    PagePaginationOptions,
    OrderingOptions {
  /** Account ID for which teams are to be retrieved */
  account_id?: number;

  /** Records per page (Default 50) */
  per_page?: number;

  /** Page number (Default 1) */
  page?: number;

  /** Sorting order on name */
  order?: string;

  /** Filter teams - mine, all */
  filter?: string;
}

export interface GetTeamOptions extends AccountSpecificOptions {
  /** Account ID for which teams are to be retrieved */
  account_id?: number;

  /** Team ID */
  id: number;
}
// /Teams

// UserCapacities
export interface GetUsersCapacitiesOptions extends AccountSpecificOptions {
  /** Account ID for which users' capacities are to be retrieved */
  account_id?: number;

  /** Users whose capacities are required */
  user_ids?: number | number[];

  /** Fetch capacities after selected date */
  since?: string;

  /** Fetch capacities before selected date */
  until?: string;
}

export interface GetUserCapacitiesOptions extends AccountSpecificOptions {
  /** Account ID for which user's capacities are to be retrieved */
  account_id?: number;

  /** User whose capacities are required */
  user_id?: number;
}
// /UserCapacities

// Users
export interface GetUsersOptions
  extends AccountSpecificOptions,
    OffsetLimitPaginationOptions,
    OrderingOptions {
  /** Account ID for which users are to be retrieved */
  account_id?: number;

  /** Retrieve users from offset */
  offset?: number;

  /** Retrieve a limited number of users */
  limit?: number;

  /** Sorting order on updated_at */
  order?: string;

  /** Filter users - Ex: filter=deleted */
  filter?: string;
}

export interface GetUserOptions extends AccountSpecificOptions {
  /** Account ID for which user is to be retrieved */
  account_id?: number;

  /** The ID of the user you want to retrieve */
  id?: number;
}

export interface GetCurrentUserOptions extends AccountSpecificOptions {
  /** Account ID for which user is to be retrieved */
  account_id?: number;
}
// /Users

/** Account ID for the client you want to retrieve */
// account_id?: number;
