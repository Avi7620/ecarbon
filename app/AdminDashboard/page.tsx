"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Mail, Building2, Phone, Calendar, Search, Download, RefreshCw, MessageSquare, Settings, ChevronDown, TrendingUp, Clock, Filter, Eye, Trash2, MoveVertical as MoreVertical, CircleCheck as CheckCircle, Circle as XCircle, CircleAlert as AlertCircle, ArrowUpDown, FileText, ChartBar as BarChart3, ChartPie as PieChart, Activity, Star, MapPin, Globe } from "lucide-react";

type FormSubmission = {
  id: number;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message: string;
  created_at?: string;
  status?: "new" | "read" | "completed";
};

export default function Admin() {
  const [formSubmissions, setFormSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [sortBy, setSortBy] = useState<"date" | "name">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const servicesOptions = [
    "Web Development",
    "Mobile App Development",
    "Digital Marketing",
    "Graphic Design",
    "E-commerce Development",
    "Consulting",
    "SEO Services",
    "UI/UX Design",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://ecocarbonbackend.onrender.com/api/contacts"
      );
      const data = await response.json();
      setFormSubmissions(data.map((sub: FormSubmission) => ({
        ...sub,
        status: sub.status || "new"
      })));
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredSubmissions = formSubmissions.filter((submission) => {
    const matchesSearch =
      submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (submission.company &&
        submission.company.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesService =
      selectedService === "all" || submission.service === selectedService;

    const matchesStatus =
      statusFilter === "all" || submission.status === statusFilter;

    return matchesSearch && matchesService && matchesStatus;
  });

  const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
    if (sortBy === "date") {
      const dateA = new Date(a.created_at || 0).getTime();
      const dateB = new Date(b.created_at || 0).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    } else {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
  });

  const totalSubmissions = formSubmissions.length;
  const todaySubmissions = formSubmissions.filter((sub) => {
    if (!sub.created_at) return false;
    const today = new Date();
    const submissionDate = new Date(sub.created_at);
    return today.toDateString() === submissionDate.toDateString();
  }).length;

  const thisWeekSubmissions = formSubmissions.filter((sub) => {
    if (!sub.created_at) return false;
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const submissionDate = new Date(sub.created_at);
    return submissionDate >= startOfWeek && submissionDate <= now;
  }).length;

  const newSubmissions = formSubmissions.filter(sub => sub.status === "new").length;
  const completedSubmissions = formSubmissions.filter(sub => sub.status === "completed").length;

  const serviceStats = servicesOptions
    .map((service) => ({
      service,
      count: formSubmissions.filter((sub) => sub.service === service).length,
      percentage: ((formSubmissions.filter((sub) => sub.service === service).length / totalSubmissions) * 100).toFixed(1)
    }))
    .filter((stat) => stat.count > 0)
    .sort((a, b) => b.count - a.count);

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Company",
      "Phone",
      "Service",
      "Message",
      "Status",
      "Submitted At",
    ];
    const csvContent = [
      headers.join(","),
      ...sortedSubmissions.map((submission) =>
        [
          `"${submission.name}"`,
          `"${submission.email}"`,
          `"${submission.company || ""}"`,
          `"${submission.phone || ""}"`,
          `"${submission.service || ""}"`,
          `"${submission.message.replace(/"/g, '""')}"`,
          `"${submission.status || "new"}"`,
          `"${submission.created_at || ""}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `form-submissions-${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "read":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "completed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "new":
        return <AlertCircle className="w-3 h-3" />;
      case "read":
        return <Eye className="w-3 h-3" />;
      case "completed":
        return <CheckCircle className="w-3 h-3" />;
      default:
        return <AlertCircle className="w-3 h-3" />;
    }
  };

  const toggleSort = (field: "date" | "name") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-6 space-y-6">
        <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
          <div className="flex-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              Admin Dashboard
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <p className="text-slate-600 dark:text-slate-400">
                Form Submissions Management
              </p>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Clock className="h-4 w-4" />
                <span>{currentTime.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === "table" ? "cards" : "table")}
            >
              {viewMode === "table" ? <PieChart className="h-4 w-4 mr-2" /> : <FileText className="h-4 w-4 mr-2" />}
              {viewMode === "table" ? "Card View" : "Table View"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportToCSV}
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button
              size="sm"
              onClick={fetchData}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Total Submissions
              </CardTitle>
              <div className="p-2 bg-blue-500 rounded-lg">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{totalSubmissions}</div>
              <div className="flex items-center mt-2 text-xs text-blue-600 dark:text-blue-400">
                <TrendingUp className="h-3 w-3 mr-1" />
                All time records
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                Today
              </CardTitle>
              <div className="p-2 bg-emerald-500 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">{todaySubmissions}</div>
              <div className="flex items-center mt-2 text-xs text-emerald-600 dark:text-emerald-400">
                <Clock className="h-3 w-3 mr-1" />
                Last 24 hours
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-violet-700 dark:text-violet-300">
                This Week
              </CardTitle>
              <div className="p-2 bg-violet-500 rounded-lg">
                <Calendar className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-violet-900 dark:text-violet-100">{thisWeekSubmissions}</div>
              <div className="flex items-center mt-2 text-xs text-violet-600 dark:text-violet-400">
                <TrendingUp className="h-3 w-3 mr-1" />
                Last 7 days
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">
                New / Pending
              </CardTitle>
              <div className="p-2 bg-orange-500 rounded-lg">
                <AlertCircle className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">{newSubmissions}</div>
              <div className="flex items-center mt-2 text-xs text-orange-600 dark:text-orange-400">
                <Activity className="h-3 w-3 mr-1" />
                Need attention
              </div>
            </CardContent>
          </Card>
        </div>

        {serviceStats.length > 0 && (
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Settings className="h-6 w-6 text-blue-600" />
                Services Distribution
              </CardTitle>
              <CardDescription>Most requested services breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {serviceStats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 hover:shadow-md transition-all hover:scale-105 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500 rounded-lg">
                        <Star className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{stat.service}</p>
                        <p className="text-xs text-slate-500">{stat.percentage}% of total</p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                      {stat.count}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-blue-600" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, email, or company..."
                  className="w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <select
                  className="appearance-none w-full border rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                >
                  <option value="all">All Services</option>
                  {servicesOptions.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  className="appearance-none w-full border rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="completed">Completed</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedService("all");
                  setStatusFilter("all");
                }}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <Card className="border-none shadow-lg">
            <CardContent className="p-20 text-center">
              <RefreshCw className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-spin" />
              <p className="text-slate-500">Loading submissions...</p>
            </CardContent>
          </Card>
        ) : viewMode === "table" ? (
          <Card className="border-none shadow-lg overflow-hidden">
            <CardHeader className="bg-slate-50 dark:bg-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    Form Submissions
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Showing {sortedSubmissions.length} of {totalSubmissions} submissions
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleSort("date")}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Date
                    <ArrowUpDown className="h-4 w-4 ml-2" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleSort("name")}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Name
                    <ArrowUpDown className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-800 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Company</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Message</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Submitted</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900">
                    {sortedSubmissions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors">
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(sub.status)}`}>
                            {getStatusIcon(sub.status)}
                            {sub.status || "new"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-slate-400" />
                            <span className="font-medium">{sub.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-slate-400" />
                            <span className="text-sm">{sub.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-slate-400" />
                            <span className="text-sm">{sub.company || "-"}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-slate-400" />
                            <span className="text-sm">{sub.phone || "-"}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                            {sub.service || "-"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm truncate max-w-xs" title={sub.message}>
                            {sub.message}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Clock className="h-3 w-3" />
                            {formatDate(sub.created_at)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {sortedSubmissions.length === 0 && (
                      <tr>
                        <td colSpan={9} className="text-center py-16">
                          <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                          <p className="text-slate-500 text-lg">No submissions found</p>
                          <p className="text-slate-400 text-sm">Try changing search or filters</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedSubmissions.map((sub) => (
              <Card key={sub.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{sub.name}</CardTitle>
                        <CardDescription className="text-xs flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(sub.created_at)}
                        </CardDescription>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(sub.status)}`}>
                      {getStatusIcon(sub.status)}
                      {sub.status || "new"}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span className="truncate">{sub.email}</span>
                  </div>
                  {sub.company && (
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="h-4 w-4 text-slate-400" />
                      <span>{sub.company}</span>
                    </div>
                  )}
                  {sub.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-slate-400" />
                      <span>{sub.phone}</span>
                    </div>
                  )}
                  {sub.service && (
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-slate-400" />
                      <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                        {sub.service}
                      </span>
                    </div>
                  )}
                  <div className="pt-2 border-t">
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                      {sub.message}
                    </p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {sortedSubmissions.length === 0 && (
              <div className="col-span-full text-center py-16">
                <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 text-lg">No submissions found</p>
                <p className="text-slate-400 text-sm">Try changing search or filters</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
