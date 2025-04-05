import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Loader2, UserPlus, Shield, UserX } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with proper URL
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://jellthappcboftfvwyyy.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Mock users for development/preview
const mockUsers = [
  {
    id: "user-1",
    email: "admin@example.com",
    role: "admin" as const,
    created_at: "2023-01-15T10:00:00Z",
    last_sign_in: "2023-09-20T14:30:00Z"
  },
  {
    id: "user-2",
    email: "user@example.com",
    role: "user" as const,
    created_at: "2023-02-20T09:15:00Z",
    last_sign_in: "2023-09-18T11:45:00Z"
  },
  {
    id: "user-3",
    email: "manager@example.com",
    role: "admin" as const,
    created_at: "2023-03-10T14:20:00Z",
    last_sign_in: "Never"
  },
  {
    id: "user-4",
    email: "customer@example.com",
    role: "user" as const,
    created_at: "2023-04-05T16:30:00Z",
    last_sign_in: "2023-09-15T09:20:00Z"
  }
];

// User type
type User = {
  id: string;
  email: string;
  role: 'user' | 'admin';
  created_at: string;
  last_sign_in: string;
};

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Fetch users from Supabase or use mock data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        
        // Check if we're using the fallback URL/key
        if (supabaseUrl === 'https://example.supabase.co') {
          // Use mock data instead
          console.log('Using mock users data');
          setTimeout(() => {
            setUsers(mockUsers);
            setIsLoading(false);
          }, 800); // Simulate network delay
          return;
        }
        
        // First get all users from auth.users
        const { data: authUsers, error: authError } = await supabase
          .from('auth.users')
          .select('id, email, created_at, last_sign_in_at');
        
        if (authError) throw authError;
        
        // Then get roles from user_roles table
        const { data: userRoles, error: rolesError } = await supabase
          .from('user_roles')
          .select('id, role');
        
        if (rolesError) throw rolesError;
        
        // Combine the data
        const combinedUsers = authUsers.map(user => {
          const roleInfo = userRoles.find(role => role.id === user.id);
          return {
            id: user.id,
            email: user.email,
            role: roleInfo ? roleInfo.role : 'user',
            created_at: user.created_at,
            last_sign_in: user.last_sign_in_at || 'Never'
          };
        });
        
        setUsers(combinedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        // Fallback to mock data
        setUsers(mockUsers);
        toast({
          title: "Using demo data",
          description: "Connected to demo mode since Supabase is not configured.",
          variant: "default",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [toast]);

  const filteredUsers = users.filter(
    user => user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAdminRole = async (userId: string, currentRole: string) => {
    try {
      setIsLoading(true);
      const newRole = currentRole === 'admin' ? 'user' : 'admin';
      
      // For demo mode, just update the local state
      if (supabaseUrl === 'https://example.supabase.co') {
        setUsers(users.map(user => 
          user.id === userId ? { ...user, role: newRole as 'user' | 'admin' } : user
        ));
        
        toast({
          title: "Role updated",
          description: `User is now ${newRole === 'admin' ? 'an admin' : 'a regular user'} (Demo Mode)`,
        });
        setIsLoading(false);
        return;
      }
      
      // Check if user exists in user_roles
      const { data: existingRole } = await supabase
        .from('user_roles')
        .select('*')
        .eq('id', userId)
        .single();
      
      let result;
      
      if (existingRole) {
        // Update existing role
        result = await supabase
          .from('user_roles')
          .update({ role: newRole })
          .eq('id', userId);
      } else {
        // Insert new role
        result = await supabase
          .from('user_roles')
          .insert({ id: userId, role: newRole });
      }
      
      if (result.error) throw result.error;
      
      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole as 'user' | 'admin' } : user
      ));
      
      toast({
        title: "Role updated",
        description: `User is now ${newRole === 'admin' ? 'an admin' : 'a regular user'}`,
      });
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: "Error updating role",
        description: "There was a problem updating the user role.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addNewUser = async () => {
    try {
      setIsSubmitting(true);
      
      // For demo mode, just add to the local state
      if (supabaseUrl === 'https://example.supabase.co') {
        const newUserId = `user-${users.length + 1}`;
        const newUser: User = {
          id: newUserId,
          email: newUserEmail,
          role: isAdmin ? 'admin' : 'user',
          created_at: new Date().toISOString(),
          last_sign_in: 'Never'
        };
        
        setUsers([...users, newUser]);
        
        toast({
          title: "User added (Demo Mode)",
          description: `Added ${newUserEmail} as ${isAdmin ? 'an admin' : 'a user'}`,
        });
        
        setNewUserEmail("");
        setIsAdmin(false);
        setIsDialogOpen(false);
        setIsSubmitting(false);
        return;
      }
      
      // In a real application, you would likely:
      // 1. Check if the user exists in auth
      // 2. If not, invite them or create their account
      // 3. Then set their role
      
      // For this demo, we'll simulate adding an existing user to user_roles
      const { error } = await supabase
        .from('user_roles')
        .insert({ 
          id: "simulate-user-id", // In a real app, this would be a real user ID
          role: isAdmin ? 'admin' : 'user' 
        });
      
      if (error) throw error;
      
      toast({
        title: "User added",
        description: `Successfully added ${newUserEmail} as ${isAdmin ? 'an admin' : 'a user'}`,
      });
      
      // Reset form and close dialog
      setNewUserEmail("");
      setIsAdmin(false);
      setIsDialogOpen(false);
      
      // In a real app, you would refresh the user list here
      
    } catch (error) {
      console.error('Error adding user:', error);
      toast({
        title: "Error adding user",
        description: "There was a problem adding the user.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 ml-auto">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" /> Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="isAdmin" className="text-right">
                    Admin
                  </Label>
                  <div className="col-span-3">
                    <Checkbox
                      id="isAdmin"
                      checked={isAdmin}
                      onCheckedChange={(checked) => setIsAdmin(checked === true)}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={addNewUser} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Adding...</>
                  ) : (
                    'Add User'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Last Sign In</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-32">
                  <div className="flex justify-center items-center">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    <span>Loading users...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-32 text-muted-foreground">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? "default" : "secondary"}>
                      {user.role === 'admin' ? (
                        <><Shield className="h-3 w-3 mr-1" /> Admin</>
                      ) : (
                        'User'
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>{user.last_sign_in === 'Never' ? 'Never' : new Date(user.last_sign_in).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toggleAdminRole(user.id, user.role)}
                    >
                      {user.role === 'admin' ? (
                        <><UserX className="h-4 w-4 mr-2" /> Remove Admin</>
                      ) : (
                        <><Shield className="h-4 w-4 mr-2" /> Make Admin</>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800 text-sm">
        <p className="font-medium">Important: This is a demonstration interface</p>
        <ul className="list-disc list-inside mt-2">
          <li>In a production environment, you would need to implement proper authentication.</li>
          <li>The "Add User" function currently simulates adding a user (will not work with actual data).</li>
          <li>To fully implement this feature, connect with Supabase Auth and create proper user flows.</li>
        </ul>
      </div>
    </div>
  );
}
