import fetch, { RequestInfo, RequestInit } from "node-fetch";
import { DEFAULT_API_URL } from "./constants.js";
import {
  GetAccountOptions,
  GetAccountsOptions,
  GetActivitiesOptions,
  GetChildLabelsOptions,
  GetClientOptions,
  GetClientsOptions,
  GetCurrentUserOptions,
  GetCurrentUserPermissionsOptions,
  GetEventOptions,
  GetEventsOptions,
  GetFilterReportsOptions,
  GetLabelOptions,
  GetLabelsOptions,
  GetProjectEventsOptions,
  GetProjectOptions,
  GetProjectsOptions,
  GetReportsOptions,
  GetRolesOptions,
  GetTeamOptions,
  GetTeamsOptions,
  GetUserCapacitiesOptions,
  GetUserEventsOptions,
  GetUserOptions,
  GetUserPermissionsOptions,
  GetUsersCapacitiesOptions,
  GetUsersOptions,
  TimelyClientOptions,
} from "./types.js";
import {
  Account,
  Activitiy,
  Client,
  Event,
  FilterReports,
  Label,
  Permission,
  Project,
  Report,
  Team,
  UserCapacities,
  UserDetail,
  UserRole,
} from "./responseTypes.js";
import { TimelyError } from "./errors.js";
import { assertAccountId } from "./helpers.js";

type FetchClientResult<Data> = Pick<Response, "status" | "statusText" | "ok"> & {
  data: Data;
};

const defaultFetchOptions = {
  body: undefined,
};

interface FetchClientInit extends RequestInit {
  urlParams?: string[][] | Record<string, string> | string | URLSearchParams | any;
}

const fetchClient =
  (accessToken: string, apiUrl: string) =>
  async <Data>(
    url: RequestInfo,
    init: FetchClientInit = defaultFetchOptions
  ): Promise<FetchClientResult<Data>> => {
    const options: FetchClientInit = Object.assign({}, init, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        ...init.headers,
      },
      body: JSON.stringify(init.body),
    });

    let query = "";

    if (options.urlParams) {
      query = `?${new URLSearchParams(options.urlParams).toString()}`;
    }

    const res = await fetch(`${apiUrl}${url}${query}`, options);

    let data;

    try {
      data = (await res.json()) as Data;
    } catch (err) {
      console.error(res.status, err);
    }

    if (!data) {
      throw new TimelyError("Failed to fetch timely data", res);
    }

    const result = {
      status: res.status,
      statusText: res.statusText,
      ok: res.ok,
      data,
    };

    if (res.status >= 200 && res.status < 300) {
      return result;
    } else {
      throw new TimelyError("Received error status code from timely", res);
    }
  };

const defaultTimelyClientOptions: TimelyClientOptions = { accessToken: "" };

export class TimelyClient {
  accountId?: number;

  fetch: <Data>(url: RequestInfo, init?: FetchClientInit) => Promise<FetchClientResult<Data>>;

  constructor(options: TimelyClientOptions = defaultTimelyClientOptions) {
    const apiUrl = options.apiUrl || DEFAULT_API_URL;
    if (!options.accessToken) {
      throw new Error("Missing required accessToken");
    }
    this.accountId = options.accountId;
    this.fetch = fetchClient(options.accessToken, apiUrl);
  }

  // Accounts
  async getAccounts(options: GetAccountsOptions = {}) {
    const res = await this.fetch<Account[]>("/accounts", { urlParams: options });
    return res;
  }

  async getAccount({ id = this.accountId }: GetAccountOptions = {}) {
    assertAccountId(id);
    const res = await this.fetch<Account>(`/accounts/${id}`);
    return res;
  }

  async getActivities({ account_id = this.accountId, ...options }: GetActivitiesOptions = {}) {
    assertAccountId(account_id);
    const res = await this.fetch<Activitiy[]>(`/${account_id}/activities`, {
      urlParams: options,
    });
    return res;
  }
  // /Accounts

  // Clients
  async getClients({ account_id = this.accountId, ...options }: GetClientsOptions = {}) {
    assertAccountId(account_id);
    const res = await this.fetch<Client[]>(`/${account_id}/clients`, {
      urlParams: options,
    });

    return res;
  }

  async getClient({ account_id = this.accountId, id, ...options }: GetClientOptions) {
    assertAccountId(account_id);
    const res = await this.fetch<Client>(`/${account_id}/clients/${id}`, {
      urlParams: options,
    });

    return res;
  }

  // async createClient({ account_id = this.accountId, ...options }: CreateClientOptions) {
  //   const res = await this.fetch<Client>(`/${account_id}/clients`, {
  //     method: "POST",
  //     body: options,
  //   });

  //   return res;
  // }

  // async updateClient({ account_id = this.accountId, id, ...options }: UpdateClientOptions) {
  //   const res = await this.fetch<Client>(`/${account_id}/clients/${id}`, {
  //     method: "PUT",
  //     body: options,
  //   });

  //   return res;
  // }
  // /Clients

  // Events
  async getEvents({ account_id = this.accountId, ...options }: GetEventsOptions = {}) {
    assertAccountId(account_id);
    const res = await this.fetch<Event[]>(`/${account_id}/events`, {
      urlParams: options,
    });

    return res;
  }

  async getProjectEvents({
    account_id = this.accountId,
    project_id,
    ...options
  }: GetProjectEventsOptions) {
    assertAccountId(account_id);
    const res = await this.fetch<Event[]>(`/${account_id}/projects/${project_id}/events`, {
      urlParams: options,
    });

    return res;
  }

  async getUserEvents({ account_id = this.accountId, user_id, ...options }: GetUserEventsOptions) {
    assertAccountId(account_id);
    const res = await this.fetch<Event[]>(`/${account_id}/users/${user_id}/events`, {
      urlParams: options,
    });

    return res;
  }

  async getEvent({ account_id = this.accountId, id, ...options }: GetEventOptions) {
    assertAccountId(account_id);
    const res = await this.fetch<Event[]>(`/${account_id}/events/${id}`, {
      urlParams: options,
    });

    return res;
  }
  // /Events

  // Labels
  async getLabels({ account_id = this.accountId, ...options }: GetLabelsOptions = {}) {
    assertAccountId(account_id);
    const res = await this.fetch<Label[]>(`/${account_id}/labels`, {
      urlParams: options,
    });

    return res;
  }

  async getChildLabels({ account_id = this.accountId, ...options }: GetChildLabelsOptions) {
    assertAccountId(account_id);
    const res = await this.fetch<Label[]>(`/${account_id}/labels`, {
      urlParams: options,
    });

    return res;
  }

  async getLabel({ account_id = this.accountId, id, ...options }: GetLabelOptions) {
    assertAccountId(account_id);
    const res = await this.fetch<Label[]>(`/${account_id}/labels/${id}`, {
      urlParams: options,
    });

    return res;
  }
  // /Labels

  // Permissions
  async getCurrentUserPermissions({
    account_id = this.accountId,
    ...options
  }: GetCurrentUserPermissionsOptions = {}) {
    assertAccountId(account_id);
    const res = await this.fetch<Permission[]>(`/${account_id}/users/current/permissions`, {
      urlParams: options,
    });

    return res;
  }

  async getUserPermissions({
    account_id = this.accountId,
    user_id,
    ...options
  }: GetUserPermissionsOptions) {
    assertAccountId(account_id);
    const res = await this.fetch<Permission[]>(`/${account_id}/users/${user_id}/permissions`, {
      urlParams: options,
    });

    return res;
  }
  // /Permissions

  // Projects
  async getProjects({ account_id = this.accountId, ...options }: GetProjectsOptions = {}) {
    assertAccountId(account_id);
    const res = await this.fetch<Project[]>(`/${account_id}/projects`, {
      urlParams: options,
    });

    return res;
  }

  async getProject({ account_id = this.accountId, id, ...options }: GetProjectOptions) {
    assertAccountId(account_id);
    const res = await this.fetch<Project[]>(`/${account_id}/projects/${id}`, {
      urlParams: options,
    });

    return res;
  }
  // /Projects

  // Reports
  async getReports({ account_id = this.accountId, ...options }: GetReportsOptions = {}) {
    assertAccountId(account_id);
    const res = await this.fetch<Report[]>(`/${account_id}/reports`, {
      urlParams: options,
    });

    return res;
  }

  async getFilterReports({
    account_id = this.accountId,
    ...options
  }: GetFilterReportsOptions = {}) {
    assertAccountId(account_id);
    const res = await this.fetch<FilterReports>(`/${account_id}/reports/filter`, {
      urlParams: options,
    });

    return res;
  }
  // /Reports

  // Roles
  async getRoles({ account_id = this.accountId, ...options }: GetRolesOptions = {}) {
    assertAccountId(account_id);
    const res = await this.fetch<UserRole[]>(`/${account_id}/roles`, {
      urlParams: options,
    });

    return res;
  }
  // /Roles

  // Teams
  async getTeams({ account_id = this.accountId, ...options }: GetTeamsOptions = {}) {
    assertAccountId(account_id);
    const res = await this.fetch<Team[]>(`/${account_id}/teams`, {
      urlParams: options,
    });

    return res;
  }

  async getTeam({ account_id = this.accountId, id, ...options }: GetTeamOptions) {
    assertAccountId(account_id);
    const res = await this.fetch<Team>(`/${account_id}/teams/${id}`, {
      urlParams: options,
    });

    return res;
  }
  // /Teams

  // UserCapacities
  async getUsersCapacities({
    account_id = this.accountId,
    ...options
  }: GetUsersCapacitiesOptions = {}) {
    assertAccountId(account_id);
    const res = await this.fetch<UserCapacities[]>(`/${account_id}/users/capacities`, {
      urlParams: options,
    });

    return res;
  }

  async getUserCapacities({
    account_id = this.accountId,
    user_id,
    ...options
  }: GetUserCapacitiesOptions) {
    assertAccountId(account_id);
    const res = await this.fetch<UserCapacities[]>(`/${account_id}/users/${user_id}/capacities`, {
      urlParams: options,
    });

    return res;
  }
  // /UserCapacities

  // UserCapacities
  async getUsers({ account_id = this.accountId, ...options }: GetUsersOptions = {}) {
    assertAccountId(account_id);
    const res = await this.fetch<UserDetail[]>(`/${account_id}/users`, {
      urlParams: options,
    });

    return res;
  }

  async getUser({ account_id = this.accountId, id, ...options }: GetUserOptions) {
    assertAccountId(account_id);
    const res = await this.fetch<UserDetail[]>(`/${account_id}/users/${id}`, {
      urlParams: options,
    });

    return res;
  }

  async getCurrentUser({ account_id = this.accountId, ...options }: GetCurrentUserOptions = {}) {
    assertAccountId(account_id);
    const res = await this.fetch<UserDetail[]>(`/${account_id}/users/current`, {
      urlParams: options,
    });

    return res;
  }
  // /UserCapacities
}
