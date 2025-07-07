import type React from "react"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Search, Edit, Trash2, Plus, Users } from "lucide-react"

// Type definition for individual data
interface Individual {
  id: string
  firstName: string
  lastName: string
  familyNumber: string
  phoneNumber: string
  role: string
  registered: boolean
}

// Mock data for demonstration
const mockData: Individual[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    familyNumber: "FAM001",
    phoneNumber: "+1234567890",
    role: "Head of Family",
    registered: true,
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    familyNumber: "FAM002",
    phoneNumber: "+1234567891",
    role: "Member",
    registered: false,
  },
  {
    id: "3",
    firstName: "Michael",
    lastName: "Johnson",
    familyNumber: "FAM003",
    phoneNumber: "+1234567892",
    role: "Elder",
    registered: true,
  },
  {
    id: "4",
    firstName: "Sarah",
    lastName: "Williams",
    familyNumber: "FAM001",
    phoneNumber: "+1234567893",
    role: "Member",
    registered: true,
  },
  {
    id: "5",
    firstName: "David",
    lastName: "Brown",
    familyNumber: "FAM004",
    phoneNumber: "+1234567894",
    role: "Youth Leader",
    registered: false,
  },
]

export default function MuComponent() {
  const [individuals, setIndividuals] = useState<Individual[]>(mockData)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingIndividual, setEditingIndividual] = useState<Individual | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Filter individuals based on search term
  const filteredIndividuals = useMemo(() => {
    return individuals.filter(
      (individual) =>
        individual.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        individual.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        individual.familyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        individual.phoneNumber.includes(searchTerm) ||
        individual.role.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [individuals, searchTerm])

  // Handle edit individual
  const handleEdit = (individual: Individual) => {
    setEditingIndividual(individual)
    setIsEditDialogOpen(true)
  }

  // Handle save edited individual
  const handleSaveEdit = (individual: Individual | Omit<Individual, "id">) => {
    if ('id' in individual) {
      // Edit existing individual
      setIndividuals((prev) =>
        prev.map((ind) => (ind.id === individual.id ? individual as Individual : ind))
      )
    }
    setIsEditDialogOpen(false)
    setEditingIndividual(null)
  }
  

  // Handle delete individual
  const handleDelete = (id: string) => {
    setIndividuals((prev) => prev.filter((ind) => ind.id !== id))
  }

  // Handle add new individual
  const handleAddNew = (newIndividual: Omit<Individual, "id">) => {
    const individual: Individual = {
      ...newIndividual,
      id: Date.now().toString(),
    }
    setIndividuals((prev) => [...prev, individual])
    setIsAddDialogOpen(false)
  }

  const registeredCount = individuals.filter((ind) => ind.registered).length
  const totalCount = individuals.length

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">MU Group Dashboard</h1>
          <p className="text-muted-foreground">Manage and view all individuals registered under the MU group</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Individual
            </Button>
          </DialogTrigger>
          <AddEditDialog onSave={handleAddNew} onCancel={() => setIsAddDialogOpen(false)} />
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Individuals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registered</CardTitle>
            <Badge variant="default" className="h-4 w-4 p-0" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{registeredCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unregistered</CardTitle>
            <Badge variant="secondary" className="h-4 w-4 p-0" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCount - registeredCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Table */}
      <Card>
        <CardHeader>
          <CardTitle>Individual Records</CardTitle>
          <CardDescription>A comprehensive list of all individuals in the MU group</CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search individuals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Family Number</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIndividuals.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No individuals found matching your search.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredIndividuals.map((individual) => (
                    <TableRow key={individual.id}>
                      <TableCell className="font-medium">{individual.firstName}</TableCell>
                      <TableCell>{individual.lastName}</TableCell>
                      <TableCell>{individual.familyNumber}</TableCell>
                      <TableCell>{individual.phoneNumber}</TableCell>
                      <TableCell>{individual.role}</TableCell>
                      <TableCell>
                        <Badge variant={individual.registered ? "default" : "secondary"}>
                          {individual.registered ? "Yes" : "No"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(individual)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete {individual.firstName}{" "}
                                  {individual.lastName} from the records.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(individual.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        {editingIndividual && (
          <AddEditDialog
            individual={editingIndividual}
            onSave={handleSaveEdit}
            onCancel={() => {
              setIsEditDialogOpen(false)
              setEditingIndividual(null)
            }}
          />
        )}
      </Dialog>
    </div>
  )
}

// Add/Edit Dialog Component
interface AddEditDialogProps {
  individual?: Individual
  onSave: (individual: Individual | Omit<Individual, "id">) => void
  onCancel: () => void
}

function AddEditDialog({ individual, onSave, onCancel }: AddEditDialogProps) {
  const [formData, setFormData] = useState({
    firstName: individual?.firstName || "",
    lastName: individual?.lastName || "",
    familyNumber: individual?.familyNumber || "",
    phoneNumber: individual?.phoneNumber || "",
    role: individual?.role || "",
    registered: individual?.registered || false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (individual) {
      onSave({ ...individual, ...formData })
    } else {
      onSave(formData)
    }
  }

  const roles = ["Head of Family", "Member", "Elder", "Youth Leader", "Deacon", "Other"]

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{individual ? "Edit Individual" : "Add New Individual"}</DialogTitle>
        <DialogDescription>
          {individual
            ? "Make changes to the individual's information here."
            : "Add a new individual to the MU group."}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="familyNumber">Family Number</Label>
          <Input
            id="familyNumber"
            value={formData.familyNumber}
            onChange={(e) => setFormData((prev) => ({ ...prev, familyNumber: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Select value={formData.role} onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="registered">Registration Status</Label>
          <Select
            value={formData.registered.toString()}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, registered: value === "true" }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Registered</SelectItem>
              <SelectItem value="false">Not Registered</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">{individual ? "Save Changes" : "Add Individual"}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
