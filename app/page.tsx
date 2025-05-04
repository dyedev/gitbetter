"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";
import {
  AlertCircle,
  CheckCircle,
  EllipsisIcon,
  FileCode,
  Layout,
  Palette,
  Plus,
  Server,
} from "lucide-react";
import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { GitHubLoginButton } from "@/components/github/login-button";
import { GitHubLogoutButton } from "@/components/github/logout-button";

const GET_RECENT_REPOSITORIES = gql`
  query GetRepositories {
    viewer {
      login
      repositories(first: 5, orderBy: { field: PUSHED_AT, direction: DESC }) {
        nodes {
          name
          description
          stargazerCount
          owner {
            login
          }
        }
      }
    }
  }
`;

const GET_RECENT_PULL_REQUESTS = gql`
  query GetPullRequests($prAuthoredQuery: String!, $prAssignedQuery: String!) {
    authored: search(first: 3, query: $prAuthoredQuery, type: ISSUE) {
      issueCount
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ... on PullRequest {
          title
          url
          number
          updatedAt
          repository {
            nameWithOwner
          }
          comments {
            totalCount
          }
          commits(last: 1) {
            totalCount
            nodes {
              commit {
                statusCheckRollup {
                  state
                }
              }
            }
          }
        }
      }
    }
    assigned: search(first: 3, query: $prAssignedQuery, type: ISSUE) {
      issueCount
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ... on PullRequest {
          title
          url
          number
          updatedAt
          repository {
            nameWithOwner
          }
          comments {
            totalCount
          }
          commits(last: 1) {
            totalCount
            nodes {
              commit {
                statusCheckRollup {
                  state
                }
              }
            }
          }
        }
      }
    }
  }
`;

const GET_USER_INFO = gql`
  query GetUserInfo {
    viewer {
      login
      avatarUrl
    }
  }
`;

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data: recentRepositoriesData } = useQuery(GET_RECENT_REPOSITORIES, {
    skip: !isAuthenticated,
  });

  const { data: userInfoData } = useQuery(GET_USER_INFO, {
    skip: !isAuthenticated,
  });

  const prAuthoredQuery = `is:pr is:open author:${userInfoData?.viewer?.login} sort:updated`;
  const prAssignedQuery = `is:pr is:open assigned:${userInfoData?.viewer?.login} sort:updated`;

  const { data: pullRequestData, error: pullRequestErorrs } = useQuery(
    GET_RECENT_PULL_REQUESTS,
    {
      skip: !isAuthenticated,
      variables: {
        prAssignedQuery,
        prAuthoredQuery,
      },
    }
  );

  if (pullRequestErorrs) {
    console.error("Error fetching pull requests:", pullRequestErorrs);
  }

  useEffect(() => {
    // Check if GitHub token exists in localStorage
    const token = localStorage.getItem("github_token");
    setIsAuthenticated(!!token);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-2xl font-bold mb-6">GitHub Dashboard</h1>
        <p className="text-muted-foreground mb-8">
          Sign in with GitHub to view your repositories and activity
        </p>
        <GitHubLoginButton />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <GitHubLogoutButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column (2/3 width on desktop) */}
        <div className="md:col-span-2 space-y-6">
          {/* Active Pull Requests */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Active Pull Requests</CardTitle>
              <Button variant="link" className="text-sm">
                View all
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {[
                  ...(pullRequestData?.authored.nodes || []),
                  ...(pullRequestData?.assigned.nodes || []),
                ].map((pr: any) => (
                  <div key={pr.url}>
                    <div className="flex items-start gap-2 mb-2">
                      {pr.commits.nodes[0]?.commit.statusCheckRollup?.state ===
                      "SUCCESS" ? (
                        <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                        </span>
                      ) : pr.commits.nodes[0]?.commit.statusCheckRollup
                          ?.state === "PENDING" ? (
                        <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                          <span className="text-xs font-bold">
                            <EllipsisIcon className="h-4 w-4 animate-spin" />
                          </span>
                        </span>
                      ) : (
                        <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-600">
                          <AlertCircle className="h-4 w-4" />
                        </span>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">
                            {pr.title}
                            {" (#"}
                            {pr.number}
                            {")"}
                          </h3>
                          <span className="text-sm text-muted-foreground">
                            Updated{" "}
                            {new Date(pr.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {pr.repository.nameWithOwner}
                          {" · "}
                          {pr.comments?.totalCount} comments
                          {" · "}
                          {pr.commits?.totalCount} commits
                        </p>
                      </div>
                    </div>
                    <div className="ml-8 bg-muted p-3 rounded-md text-sm font-mono text-red-500 whitespace-pre-wrap">
                      Error: Failed to compile. src/middleware/auth.ts:42:5
                      TypeError: Cannot read property 'token' of undefined
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Reviews */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Pending Reviews</CardTitle>
              <Button variant="link" className="text-sm">
                View all
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {/* Review 1 */}
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <span className="text-xs font-bold">R</span>
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">
                        Implement new API endpoints (#876)
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        Requested 1d ago
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      repo/backend-api · 12 files changed · +342/-128
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Review 2 */}
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <span className="text-xs font-bold">R</span>
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">
                        Fix accessibility issues (#1102)
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        Requested 4h ago
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      repo/frontend-app · 5 files changed · +87/-42
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (1/3 width on desktop) */}
        <div className="space-y-6">
          {/* Recent Repositories */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Repositories</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  New
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {recentRepositoriesData?.viewer?.repositories?.nodes.map(
                  (repo: any) => (
                    <div className="flex items-start gap-3" key={repo.name}>
                      <span className="text-purple-500">
                        <Layout className="h-5 w-5" />
                      </span>
                      <div className="flex-1">
                        <h3 className="font-medium">
                          {repo.owner.login}/{repo.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Updated {repo.updatedAt}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          {/* Your Teams */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Your Teams</CardTitle>
              <Button variant="link" className="text-sm">
                View all
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {/* Team 1 */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <span className="text-purple-500">
                      <Layout className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-medium">Frontend</h3>
                      <p className="text-sm text-muted-foreground">
                        3 open issues
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-blue-50">
                    8 members
                  </Badge>
                </div>

                {/* Team 2 */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <span className="text-green-500">
                      <Server className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-medium">Backend</h3>
                      <p className="text-sm text-muted-foreground">
                        7 open issues
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-blue-50">
                    6 members
                  </Badge>
                </div>

                {/* Team 3 */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-500">
                      <FileCode className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-medium">DevOps</h3>
                      <p className="text-sm text-muted-foreground">
                        2 open issues
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-blue-50">
                    4 members
                  </Badge>
                </div>

                {/* Team 4 */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <span className="text-pink-500">
                      <Palette className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-medium">Design</h3>
                      <p className="text-sm text-muted-foreground">
                        1 open issue
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-blue-50">
                    5 members
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
