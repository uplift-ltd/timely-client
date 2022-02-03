export interface Account {
  id: number;
  name: string;
  color: string;
  currency: Currency;
  logo: Logo;
  from: string;
  max_users: number;
  seats: number;
  max_projects: number;
  plan_id: number;
  plan_name: string;
  next_charge: string;
  start_of_week: number;
  created_at: number;
  payment_mode: string;
  paid: boolean;
  company_size: string;
  plan_code: string;
  plan_custom: boolean;
  appstore_transaction_id: null;
  owner_id: number;
  weekly_user_capacity: number;
  default_work_days: string;
  default_hour_rate: number;
  support_email: string;
  estimated_company_size: null;
  industry: string;
  num_users: number;
  num_projects: number;
  active_projects_count: number;
  total_projects_count: number;
  capacity: AccountCapacity;
  status: string;
  beta: boolean;
  expired: boolean;
  trial: boolean;
  days_to_end_trial: number;
  features: Feature[];
}

export interface AccountCapacity {
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
  total_hours: number;
  total_seconds: number;
  total_minutes: number;
}

export interface Activitiy {
  id: number;
  user: User;
  message: string;
  activity_type: string;
  url: string;
  updated_at: string;
  detail: null | string;
  associated_ids: string[];
  entity_type: EntityType;
  entity_deleted: boolean;
  parent_entity_name: string;
  entity: Entity;
  anomaly: boolean;
}

export interface Avatar {
  large_retina: string;
  large: string;
  medium_retina: string;
  medium: string;
  timeline: string;
}

export enum BudgetCalculation {
  Completed = "completed",
  Pending = "pending",
}

export enum BudgetType {
  Empty = "",
  M = "M",
}

export interface Client {
  id: number;
  name: string;
  active: boolean;
  external_id: null;
  updated_at: string;
}

export interface Cost {
  fractional: number;
  formatted: string;
  amount: number;
}

export interface Currency {
  id: string;
  name: string;
  iso_code: string;
  symbol: string;
  symbol_first: boolean;
}

export interface Duration {
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
  total_hours: number;
  total_seconds: number;
  total_minutes: number;
}

export interface Feature {
  name: string;
  days: number;
}

export interface Logo {
  large_retina: string;
  medium_retina: string;
  small_retina: string;
  brand_logo: boolean;
}

export enum EnableLabels {
  All = "all",
  Custom = "custom",
  None = "none",
}

export interface Entity {
  id: number;
  active: boolean;
  name: string;
  color: null | string;
  client?: Client;
  updated_at: string;
}

export enum EntityType {
  Company = "Company",
  Project = "Project",
}

export interface Event {
  id: number;
  uid: string;
  user: User;
  project: EventProject;
  duration: Duration;
  estimated_duration: Duration;
  cost: Cost;
  estimated_cost: Cost;
  day: string;
  note: string;
  sequence: number;
  estimated: boolean;
  timer_state: TimerState;
  timer_started_on: number;
  timer_stopped_on: number;
  label_ids: number[];
  user_ids: any[];
  updated_at: number;
  created_at: number;
  created_from: string;
  updated_from: string;
  billed: boolean;
  billable: boolean;
  to: null | string;
  from: null | string;
  deleted: boolean;
  hour_rate: number;
  hour_rate_in_cents: number;
  creator_id: number;
  updater_id: number;
  external_id: null;
  entry_ids: number[];
  suggestion_id: number | null;
  draft: boolean;
  manage: boolean;
  forecast_id: null;
  billed_at: null;
  locked_reason: null;
  locked: boolean;
  invoice_id: null;
  timestamps: any[];
}

export interface EventProject {
  id: number;
  active: boolean;
  account_id: number;
  name: string;
  color: string;
  rate_type: RateType;
  billable: boolean;
  updated_at: number;
  external_id: null;
  budget_scope: null;
  client: Client;
  required_notes: boolean;
  required_labels: boolean;
  budget_expired_on: null;
  has_recurrence: boolean;
  enable_labels: EnableLabels;
  budget: number;
  budget_type: BudgetType;
  budget_calculation: BudgetCalculation;
  hour_rate: number;
  hour_rate_in_cents: number;
  budget_progress: number;
  budget_percent: number;
  invoice_by_budget: boolean;
  labels: Label[];
  label_ids: number[];
  required_label_ids: number[];
}

export interface FilterReports {
  totals: FilterReportsTotals;
  clients: FilterReportsTotals[];
  users: FilterReportsUser[];
  labels: Label[];
  days: FilterReportsTotals[];
  teams: FilterReportsTotals[];
}

export interface FilterReportsUser {
  id: number;
  email: string;
  name: string;
  time_zone: string;
  updated_at: number;
  active: boolean;
  deleted: boolean;
  memory_onboarded: boolean;
  day_view_onboarded: boolean;
  last_received_memories_date: null | string;
  date_format: string;
  time_format: string;
  avatar: Avatar;
  duration: Duration;
  estimated_duration: Duration;
  billed_duration: Duration;
  unbilled_duration: Duration;
  billable_duration: Duration;
  non_billable_duration: Duration;
  cost: Cost;
  estimated_cost: Cost;
  billed_cost: Cost;
  unbilled_cost: Cost;
  internal_hour_rate?: number;
}

export interface FilterReportsProject {
  id: number;
  active: boolean;
  account_id: number;
  name: string;
  color: string;
  rate_type: string;
  billable: boolean;
  updated_at: number;
  external_id: null;
  budget_scope: null;
  client: Client;
  required_notes: boolean;
  required_labels: boolean;
  budget_expired_on: null;
  has_recurrence: boolean;
  enable_labels: string;
  budget: number;
  budget_type: string;
  budget_calculation: string;
  hour_rate: number;
  hour_rate_in_cents: number;
  budget_progress: number;
  budget_percent: number;
  invoice_by_budget: boolean;
  duration: Duration;
  estimated_duration: Duration;
  billed_duration: Duration;
  unbilled_duration: Duration;
  billable_duration: Duration;
  non_billable_duration: Duration;
  cost: Cost;
  estimated_cost: Cost;
  billed_cost: Cost;
  unbilled_cost: Cost;
}

export interface FilterReportsTotals {
  id?: number;
  name?: string;
  projects?: FilterReportsProject[];
  duration: Duration;
  estimated_duration: Duration;
  billed_duration: Duration;
  unbilled_duration: Duration;
  billable_duration: Duration;
  non_billable_duration: Duration;
  cost: Cost;
  estimated_cost: Cost;
  billed_cost: Cost;
  unbilled_cost: Cost;
}

export interface Label {
  project_id: number;
  label_id: number;
  budget: number | null;
  required: boolean;
  updated_at: string;
  children?: Label[];
}

export enum Permission {
  Create = "create",
  Read = "read",
  Update = "update",
  Delete = "delete",
}

export interface Project {
  id: number;
  active: boolean;
  account_id: number;
  name: string;
  color: string;
  rate_type: RateType;
  billable: boolean;
  updated_at: number;
  external_id: null;
  budget_scope: null;
  client: Client;
  required_notes: boolean;
  required_labels: boolean;
  budget_expired_on: null;
  has_recurrence: boolean;
  enable_labels: EnableLabels;
  budget: number;
  budget_type: BudgetType;
  budget_calculation: BudgetCalculation;
  hour_rate: number;
  hour_rate_in_cents: number;
  budget_progress: number;
  budget_percent: number;
  invoice_by_budget: boolean;
  users: ProjectUser[];
  labels: Label[];
  label_ids: number[];
  required_label_ids: number[];
  cost: Cost;
  estimated_cost: Cost;
  duration: Duration;
  estimated_duration: Duration;
  billed_cost: Cost;
  billed_duration: Duration;
  unbilled_cost: Cost;
  unbilled_duration: Duration;
}

export interface ProjectUser {
  user_id: number;
  hour_rate: number;
  hour_rate_in_cents: number;
  updated_at: string;
  created_at: string;
  deleted: boolean;
}

export enum RateType {
  NonBillable = "non-billable",
  User = "user",
}

export interface Report {
  id: number;
  name: string;
  projects: Project[];
  duration: Duration;
  estimated_duration: Duration;
  billed_duration: Duration;
  unbilled_duration: Duration;
  billable_duration: Duration;
  non_billable_duration: Duration;
  cost: Cost;
  estimated_cost: Cost;
  billed_cost: Cost;
  unbilled_cost: Cost;
}

export interface ReportProject {
  id: number;
  active: boolean;
  account_id: number;
  name: string;
  color: string;
  rate_type: string;
  billable: boolean;
  updated_at: number;
  external_id: null;
  budget_scope: null;
  client: Client;
  required_notes: boolean;
  required_labels: boolean;
  budget_expired_on: null;
  has_recurrence: boolean;
  enable_labels: string;
  budget: number;
  budget_type: string;
  budget_calculation: string;
  hour_rate: number;
  hour_rate_in_cents: number;
  budget_progress: number;
  budget_percent: number;
  invoice_by_budget: boolean;
  duration: Duration;
  estimated_duration: Duration;
  billed_duration: Duration;
  unbilled_duration: Duration;
  billable_duration: Duration;
  non_billable_duration: Duration;
  cost: Cost;
  estimated_cost: Cost;
  billed_cost: Cost;
  unbilled_cost: Cost;
}

export interface ResourcePermissions {
  resource: string;
  permissions: string[];
}

export interface Scope {
  name: string;
  display_name: string;
  description: string;
  default: boolean;
  options: boolean[];
}

export interface Team {
  id: number;
  name: string;
  color: string;
  emoji: string;
  external_id: null;
  user_ids: number[];
  users: TeamUser[];
}

export interface TeamUser {
  id: number;
  user_id: number;
  team_id: number;
  lead: boolean;
}

export enum TimerState {
  Default = "default",
  Stop = "stop",
}

export interface User {
  id: number;
  email: string;
  name: string;
  avatar: Avatar;
  updated_at: string;
}

export interface UserCapacities {
  user_id: number;
  capacities: UserCapacity[];
}

export interface UserCapacity {
  id: number | null;
  weekly_capacity: number;
  daily_capacity: number;
  weekdays: string;
  work_days: string;
  total_working_days: number | null;
  weekly_working_days: number;
  current: boolean;
  start_date: string;
  end_date: null | string;
}

export interface UserDetail {
  id: number;
  email: string;
  name: string;
  active: boolean;
  day_view_onboarded: boolean;
  memory_onboarded: boolean;
  created_at: number;
  updated_at: number;
  last_received_memories_date: null | string;
  sign_in_count: number;
  external_id: null;
  time_zone: string;
  avatar: Avatar;
  type: string;
  work_days: string;
  weekdays: string;
  weekly_capacity: number;
  user_level: string;
  admin: boolean;
  hide_hourly_rate: boolean;
  hide_internal_hourly_rate: boolean;
  deleted: boolean;
  default_hour_rate: number;
  internal_hour_rate: number;
  role_id: number;
  role: UserRole;
}

export interface UserRole {
  id: number;
  name: string;
  display_name: string;
  description: string;
  scopes: Scope[];
  default: boolean;
}
