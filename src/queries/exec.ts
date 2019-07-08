import gql from 'graphql-tag';

export const findQuery = gql`
    query findJobs($projectId: String!, $query: Query) {
        output(projectId: $projectId, query: $query)
            @rest(
                type: "[Execution]"
                path: "/projects/{args.projectId}/exec?{args.query}"
            ) {
            paging
            data
        }
    }
`;

export const getQuery = gql`
    query findJob($projectId: String!, $id: String!) {
        output(projectId: $projectId, id: $id)
            @rest(
                type: "Script"
                path: "/projects/{args.projectId}/exec/{args.id}"
            ) {
            jobId
            scriptId
            status
            cause
            params
            startedAt
            endedAt
            logs
            error
        }
    }
`;
