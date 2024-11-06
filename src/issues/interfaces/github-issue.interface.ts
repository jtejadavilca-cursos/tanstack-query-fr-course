import { GithubReactions, GithubUser } from "./";

export interface GithubIssue {
    url: string;
    repository_url: string;
    labels_url: string;
    comments_url: string;
    events_url: string;
    html_url: string;
    id: number;
    node_id: string;
    number: number;
    title: string;
    user: GithubUser;
    labels: Label[];
    state: State;
    locked: boolean;
    assignee: GithubUser | null;
    assignees: GithubUser[];
    milestone: null;
    comments: number;
    created_at: Date;
    updated_at: Date;
    closed_at: null;
    author_association: AuthorAssociation;
    active_lock_reason: null;
    draft?: boolean;
    pull_request?: PullRequest;
    body: null | string;
    closed_by: null;
    reactions: GithubReactions;
    timeline_url: string;
    performed_via_github_app: null;
    state_reason: null;
}

export enum AuthorAssociation {
    Collaborator = "COLLABORATOR",
    Contributor = "CONTRIBUTOR",
    Member = "MEMBER",
    None = "NONE",
}

export interface Label {
    id: number;
    node_id: string;
    url: string;
    name: string;
    color: string;
    default: boolean;
    description?: string | null;
}

export interface PullRequest {
    url: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
    merged_at: null;
}

export enum State {
    Open = "open",
    Close = "close",
}
