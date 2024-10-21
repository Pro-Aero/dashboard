export function templateData() {
  const templateResponse = {
    name: "Project Alpha",
    tasks: [
      {
        id: "task-001",
        title: "Design User Interface",
        bucketId: "bucket-ui",
        orderHint: "8000000000000000000",
        assigneePriority: "1",
        percentComplete: 75,
        startDateTime: "2023-06-01T09:00:00Z",
        createdDateTime: "2023-05-28T14:30:00Z",
        dueDateTime: "2023-06-15T17:00:00Z",
        hasDescription: true,
        previewType: "noPreview",
        completedDateTime: null,
        referenceCount: 3,
        checkListItemCount: 5,
        activeCheckListItemCount: 2,
        conversationThreadId: "conv-001",
        priority: 2,
        hours: 40,
        status: "In Progress",
        planner: {
          id: "planner-001",
          title: "Project Alpha Planner",
        },
        assignments: [
          {
            id: "assign-001",
            assignedBy: {
              user: {
                id: "user-001",
                displayName: "John Doe",
              },
            },
            assignedDateTime: "2023-05-28T15:00:00Z",
            orderHint: "8000000000000000000",
            assignedTo: {
              user: {
                id: "user-002",
                displayName: "Jane Smith",
              },
            },
          },
        ],
      },
      {
        id: "task-002",
        title: "Implement Backend API",
        bucketId: "bucket-backend",
        orderHint: "8200000000000000000",
        assigneePriority: "2",
        percentComplete: 50,
        startDateTime: "2023-06-05T08:00:00Z",
        createdDateTime: "2023-06-01T10:15:00Z",
        dueDateTime: "2023-06-20T18:00:00Z",
        hasDescription: true,
        previewType: "noPreview",
        completedDateTime: null,
        referenceCount: 2,
        checkListItemCount: 8,
        activeCheckListItemCount: 5,
        conversationThreadId: "conv-002",
        priority: 1,
        hours: 60,
        status: "In Progress",
        planner: {
          id: "planner-001",
          title: "Project Alpha Planner",
        },
        assignments: [
          {
            id: "assign-002",
            assignedBy: {
              user: {
                id: "user-001",
                displayName: "John Doe",
              },
            },
            assignedDateTime: "2023-06-01T11:00:00Z",
            orderHint: "8200000000000000000",
            assignedTo: {
              user: {
                id: "user-003",
                displayName: "Bob Johnson",
              },
            },
          },
        ],
      },
      {
        id: "task-003",
        title: "Write Documentation",
        bucketId: "bucket-docs",
        orderHint: "8400000000000000000",
        assigneePriority: "3",
        percentComplete: 25,
        startDateTime: "2023-06-10T09:00:00Z",
        createdDateTime: "2023-06-05T13:45:00Z",
        dueDateTime: "2023-06-25T17:00:00Z",
        hasDescription: false,
        previewType: "noPreview",
        completedDateTime: null,
        referenceCount: 1,
        checkListItemCount: 3,
        activeCheckListItemCount: 3,
        conversationThreadId: "conv-003",
        priority: 3,
        hours: 20,
        status: "Not Started",
        planner: {
          id: "planner-001",
          title: "Project Alpha Planner",
        },
        assignments: [
          {
            id: "assign-003",
            assignedBy: {
              user: {
                id: "user-001",
                displayName: "John Doe",
              },
            },
            assignedDateTime: "2023-06-05T14:00:00Z",
            orderHint: "8400000000000000000",
            assignedTo: {
              user: {
                id: "user-004",
                displayName: "Alice Brown",
              },
            },
          },
        ],
      },
      {
        id: "task-004",
        title: "Perform Quality Assurance",
        bucketId: "bucket-qa",
        orderHint: "8600000000000000000",
        assigneePriority: "2",
        percentComplete: 0,
        startDateTime: "2023-06-15T08:00:00Z",
        createdDateTime: "2023-06-10T09:30:00Z",
        dueDateTime: "2023-06-30T18:00:00Z",
        hasDescription: true,
        previewType: "noPreview",
        completedDateTime: null,
        referenceCount: 0,
        checkListItemCount: 10,
        activeCheckListItemCount: 10,
        conversationThreadId: "conv-004",
        priority: 2,
        hours: 40,
        status: "Not Started",
        planner: {
          id: "planner-001",
          title: "Project Alpha Planner",
        },
        assignments: [
          {
            id: "assign-004",
            assignedBy: {
              user: {
                id: "user-001",
                displayName: "John Doe",
              },
            },
            assignedDateTime: "2023-06-10T10:00:00Z",
            orderHint: "8600000000000000000",
            assignedTo: {
              user: {
                id: "user-005",
                displayName: "Charlie Davis",
              },
            },
          },
        ],
      },
      {
        id: "task-005",
        title: "Deploy to Production",
        bucketId: "bucket-deploy",
        orderHint: "8800000000000000000",
        assigneePriority: "1",
        percentComplete: 0,
        startDateTime: "2023-06-25T09:00:00Z",
        createdDateTime: "2023-06-15T11:00:00Z",
        dueDateTime: "2023-07-05T17:00:00Z",
        hasDescription: true,
        previewType: "noPreview",
        completedDateTime: null,
        referenceCount: 2,
        checkListItemCount: 6,
        activeCheckListItemCount: 6,
        conversationThreadId: "conv-005",
        priority: 1,
        hours: 16,
        status: "Not Started",
        planner: {
          id: "planner-001",
          title: "Project Alpha Planner",
        },
        assignments: [
          {
            id: "assign-005",
            assignedBy: {
              user: {
                id: "user-001",
                displayName: "John Doe",
              },
            },
            assignedDateTime: "2023-06-15T11:30:00Z",
            orderHint: "8800000000000000000",
            assignedTo: {
              user: {
                id: "user-002",
                displayName: "Jane Smith",
              },
            },
          },
        ],
      },
    ],
  };

  return templateResponse;
}
