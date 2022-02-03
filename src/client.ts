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
  User,
  UserCapacities,
  UserRole,
} from "./responseTypes.js";

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
  ): Promise<FetchClientResult<Data | null>> => {
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

    let data: Data | null = null;

    try {
      data = (await res.json()) as Data;
    } catch (err) {
      console.error(res.status, err);
    }

    const result = {
      status: res.status,
      statusText: res.statusText,
      ok: res.ok,
      data,
    };

    if (res.status >= 200 && res.status < 400) {
      return result;
    } else {
      throw result;
    }
  };

const defaultTimelyClientOptions: TimelyClientOptions = { accessToken: "" };

export class TimelyClient {
  fetch: <Data>(
    url: RequestInfo,
    init?: FetchClientInit
  ) => Promise<FetchClientResult<Data | null>>;

  constructor(options: TimelyClientOptions = defaultTimelyClientOptions) {
    const apiUrl = options.apiUrl || DEFAULT_API_URL;
    if (!options.accessToken) {
      throw new Error("Missing required accessToken");
    }
    this.fetch = fetchClient(options.accessToken, apiUrl);
  }

  // Accounts
  async getAccounts(options: GetAccountsOptions = {}) {
    const res = await this.fetch<Account[]>("/accounts", { urlParams: options });
    return res;
  }

  async getAccount({ id }: GetAccountOptions) {
    const res = await this.fetch<Account>(`/accounts/${id}`);
    return res;
  }

  async getActivities({ account_id, ...options }: GetActivitiesOptions) {
    const res = await this.fetch<Activitiy[]>(`/${account_id}/activities`, {
      urlParams: options,
    });
    return res;
  }
  // /Accounts

  // Clients
  async getClients({ account_id, ...options }: GetClientsOptions) {
    const res = await this.fetch<Client[]>(`/${account_id}/clients`, {
      urlParams: options,
    });

    return res;
  }

  async getClient({ account_id, id, ...options }: GetClientOptions) {
    const res = await this.fetch<Client>(`/${account_id}/clients/${id}`, {
      urlParams: options,
    });

    return res;
  }

  // async createClient({ account_id, ...options }: CreateClientOptions) {
  //   const res = await this.fetch<Client>(`/${account_id}/clients`, {
  //     method: "POST",
  //     body: options,
  //   });

  //   return res;
  // }

  // async updateClient({ account_id, id, ...options }: UpdateClientOptions) {
  //   const res = await this.fetch<Client>(`/${account_id}/clients/${id}`, {
  //     method: "PUT",
  //     body: options,
  //   });

  //   return res;
  // }
  // /Clients

  // Events
  async getEvents({ account_id, ...options }: GetEventsOptions) {
    const res = await this.fetch<Event[]>(`/${account_id}/events`, {
      urlParams: options,
    });

    return res;
  }

  async getProjectEvents({ account_id, project_id, ...options }: GetProjectEventsOptions) {
    const res = await this.fetch<Event[]>(`/${account_id}/projects/${project_id}/events`, {
      urlParams: options,
    });

    return res;
  }

  async getUserEvents({ account_id, user_id, ...options }: GetUserEventsOptions) {
    const res = await this.fetch<Event[]>(`/${account_id}/users/${user_id}/events`, {
      urlParams: options,
    });

    return res;
  }

  async getEvent({ account_id, id, ...options }: GetEventOptions) {
    const res = await this.fetch<Event[]>(`/${account_id}/events/${id}`, {
      urlParams: options,
    });

    return res;
  }
  // /Events

  // Labels
  async getLabels({ account_id, ...options }: GetLabelsOptions) {
    const res = await this.fetch<Label[]>(`/${account_id}/labels`, {
      urlParams: options,
    });

    return res;
  }

  async getChildLabels({ account_id, ...options }: GetChildLabelsOptions) {
    const res = await this.fetch<Label[]>(`/${account_id}/labels`, {
      urlParams: options,
    });

    return res;
  }

  async getLabel({ account_id, id, ...options }: GetLabelOptions) {
    const res = await this.fetch<Label[]>(`/${account_id}/labels/${id}`, {
      urlParams: options,
    });

    return res;
  }
  // /Labels

  // Permissions
  async getCurrentUserPermissions({ account_id, ...options }: GetCurrentUserPermissionsOptions) {
    const res = await this.fetch<Permission[]>(`/${account_id}/users/current/permissions`, {
      urlParams: options,
    });

    return res;
  }

  async getUserPermissions({ account_id, user_id, ...options }: GetUserPermissionsOptions) {
    const res = await this.fetch<Permission[]>(`/${account_id}/users/${user_id}/permissions`, {
      urlParams: options,
    });

    return res;
  }
  // /Permissions

  // Projects
  async getProjects({ account_id, ...options }: GetProjectsOptions) {
    const res = await this.fetch<Project[]>(`/${account_id}/projects`, {
      urlParams: options,
    });

    return res;
  }

  async getProject({ account_id, id, ...options }: GetProjectOptions) {
    const res = await this.fetch<Project[]>(`/${account_id}/projects/${id}`, {
      urlParams: options,
    });

    return res;
  }
  // /Projects

  // Reports
  async getReports({ account_id, ...options }: GetReportsOptions) {
    const res = await this.fetch<Report[]>(`/${account_id}/reports`, {
      urlParams: options,
    });

    return res;
  }

  async getFilterReports({ account_id, ...options }: GetFilterReportsOptions) {
    const res = await this.fetch<FilterReports>(`/${account_id}/reports/filter`, {
      urlParams: options,
    });

    return res;
  }
  // /Reports

  // Roles
  async getRoles({ account_id, ...options }: GetRolesOptions) {
    const res = await this.fetch<UserRole[]>(`/${account_id}/roles`, {
      urlParams: options,
    });

    return res;
  }
  // /Roles

  // Teams
  async getTeams({ account_id, ...options }: GetTeamsOptions) {
    const res = await this.fetch<Team[]>(`/${account_id}/teams`, {
      urlParams: options,
    });

    return res;
  }

  async getTeam({ account_id, id, ...options }: GetTeamOptions) {
    const res = await this.fetch<Team>(`/${account_id}/teams/${id}`, {
      urlParams: options,
    });

    return res;
  }
  // /Teams

  // UserCapacities
  async getUsersCapacities({ account_id, ...options }: GetUsersCapacitiesOptions) {
    const res = await this.fetch<UserCapacities[]>(`/${account_id}/users/capacities`, {
      urlParams: options,
    });

    return res;
  }

  async getUserCapacities({ account_id, user_id, ...options }: GetUserCapacitiesOptions) {
    const res = await this.fetch<UserCapacities[]>(`/${account_id}/users/${user_id}/capacities`, {
      urlParams: options,
    });

    return res;
  }
  // /UserCapacities

  // UserCapacities
  async getUsers({ account_id, ...options }: GetUsersOptions) {
    const res = await this.fetch<User[]>(`/${account_id}/users`, {
      urlParams: options,
    });

    return res;
  }

  async getUser({ account_id, id, ...options }: GetUserOptions) {
    const res = await this.fetch<UserCapacities[]>(`/${account_id}/users/${id}`, {
      urlParams: options,
    });

    return res;
  }

  async getCurrentUser({ account_id, ...options }: GetCurrentUserOptions) {
    const res = await this.fetch<UserCapacities[]>(`/${account_id}/users/current`, {
      urlParams: options,
    });

    return res;
  }
  // /UserCapacities
}
