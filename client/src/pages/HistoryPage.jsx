import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { ChevronDown, ChevronUp, CheckCircle, Clock, XCircle } from "lucide-react";

const mockForms = [
  {
    id: 1,
    type: "Holiday",
    dateSubmitted: "2024-07-01",
    status: "pending",
    approvals: [
      {
        level: "Project Manager",
        status: "approved",
        by: "Alice Smith",
        date: "2024-07-02",
        justification: "Project schedule allowed for holiday approval."
      },
      {
        level: "CEO",
        status: "pending",
        by: null,
        date: null,
        justification: "Awaiting CEO's review."
      },
    ],
  },
  {
    id: 2,
    type: "Leave",
    dateSubmitted: "2024-06-25",
    status: "approved",
    approvals: [
      {
        level: "Project Manager",
        status: "approved",
        by: "Bob Lee",
        date: "2024-06-26",
        justification: "Leave fits within team coverage."
      },
      {
        level: "CEO",
        status: "approved",
        by: "Carol CEO",
        date: "2024-06-27",
        justification: "No business conflict with leave dates."
      },
    ],
  },
  {
    id: 3,
    type: "Salary Raise",
    dateSubmitted: "2024-06-20",
    status: "rejected",
    approvals: [
      {
        level: "Project Manager",
        status: "approved",
        by: "Alice Smith",
        date: "2024-06-21",
        justification: "Consistent high performance."
      },
      {
        level: "CEO",
        status: "rejected",
        by: "Carol CEO",
        date: "2024-06-22",
        justification: "Budget constraints this quarter."
      },
    ],
  },
];

const statusMap = {
  approved: {
    label: "Approved",
    badge: "default",
    icon: <CheckCircle className="w-4 h-4 mr-1 text-green-600" />,
    color: "bg-green-50 text-green-700 border-green-200",
  },
  pending: {
    label: "Pending",
    badge: "secondary",
    icon: <Clock className="w-4 h-4 mr-1 text-yellow-500" />,
    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  rejected: {
    label: "Rejected",
    badge: "destructive",
    icon: <XCircle className="w-4 h-4 mr-1 text-red-600" />,
    color: "bg-red-50 text-red-700 border-red-200",
  },
};

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Approved", value: "approved" },
  { label: "Pending", value: "pending" },
  { label: "Rejected", value: "rejected" },
];

function getCurrentStatus(form) {
  if (form.status === "approved") return "Approved";
  if (form.status === "rejected") return "Rejected";
  const next = form.approvals.find((a) => a.status === "pending");
  if (next) return `Waiting for ${next.level} Approval`;
  return "Submitted";
}

const HistoryPage = () => {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);
  const filteredForms =
    filter === "all"
      ? mockForms
      : mockForms.filter((f) => f.status === filter);

  return (
    <div className="container-modern py-8 fade-in">
      <h1 className="text-3xl font-bold mb-6 text-center">Service Form History</h1>
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-sm
              ${filter === opt.value
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-secondary text-secondary-foreground border border-gray-200 hover:bg-gray-100"}
            `}
            onClick={() => setFilter(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div className="card card-hover p-0 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary/10 sticky top-0 z-10">
              <TableHead className="min-w-[120px]">Form Type</TableHead>
              <TableHead className="min-w-[140px]">Date Submitted</TableHead>
              <TableHead className="min-w-[120px]">Status</TableHead>
              <TableHead className="min-w-[160px]">Approval History</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredForms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl">🗂️</span>
                    <span className="text-muted-foreground text-lg">No forms found for this filter.</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredForms.map((form) => (
                <React.Fragment key={form.id}>
                  <TableRow
                    className={`transition-colors hover:bg-accent/50 cursor-pointer ${expanded === form.id ? "bg-accent/30" : ""}`}
                    onClick={() => setExpanded(expanded === form.id ? null : form.id)}
                  >
                    <TableCell className="font-semibold">{form.type}</TableCell>
                    <TableCell>{form.dateSubmitted}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-semibold ${statusMap[form.status].color}`}>
                        {statusMap[form.status].icon}
                        {statusMap[form.status].label}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span>{getCurrentStatus(form)}</span>
                        {expanded === form.id ? (
                          <ChevronUp className="w-4 h-4 ml-1" />
                        ) : (
                          <ChevronDown className="w-4 h-4 ml-1" />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                  {expanded === form.id && (
                    <TableRow className="bg-accent/10">
                      <TableCell colSpan={4} className="py-4">
                        <div className="flex flex-col gap-3 max-w-2xl mx-auto">
                          <div className="font-semibold mb-2 text-accent-foreground">Approval Timeline</div>
                          <ol className="relative border-l-2 border-primary/30 ml-2">
                            {form.approvals.map((a, idx) => (
                              <li key={idx} className="mb-6 ml-4">
                                <div className="absolute -left-2.5 top-1.5">
                                  {a.status === "approved" && <CheckCircle className="w-5 h-5 text-green-500 bg-white rounded-full" />}
                                  {a.status === "pending" && <Clock className="w-5 h-5 text-yellow-500 bg-white rounded-full" />}
                                  {a.status === "rejected" && <XCircle className="w-5 h-5 text-red-500 bg-white rounded-full" />}
                                </div>
                                <div className="pl-6">
                                  <div className="font-medium">
                                    {a.status === "approved" && (
                                      <>Approved by <span className="text-green-700">{a.by}</span> on <span className="text-green-700">{a.date}</span></>
                                    )}
                                    {a.status === "pending" && (
                                      <>Waiting for <span className="text-yellow-700">{a.level}</span> Approval</>
                                    )}
                                    {a.status === "rejected" && (
                                      <>Rejected by <span className="text-red-700">{a.by}</span> on <span className="text-red-700">{a.date}</span></>
                                    )}
                                  </div>
                                  <div className="text-xs text-muted-foreground mt-1">{a.level}</div>
                                  {a.justification && (
                                    <div className="text-xs italic text-muted-foreground mt-1">Reason: {a.justification}</div>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default HistoryPage; 