import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

export type OrgRole = "owner" | "admin" | "manager" | "member";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  primary_color: string | null;
  locale: string;
  currency: string;
  plan: string;
}

export interface Membership {
  org_id: string;
  role: OrgRole;
  organizations: Organization;
}

interface OrgContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  memberships: Membership[];
  currentOrg: Organization | null;
  currentRole: OrgRole | null;
  setCurrentOrgId: (id: string) => void;
  refresh: () => Promise<void>;
  signOut: () => Promise<void>;
}

const OrgContext = createContext<OrgContextValue | null>(null);
const STORAGE_KEY = "noora_current_org";

export function OrgProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [currentOrgId, _setCurrentOrgId] = useState<string | null>(null);

  const setCurrentOrgId = (id: string) => {
    _setCurrentOrgId(id);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, id);
  };

  const loadMemberships = async (uid: string) => {
    const { data, error } = await supabase
      .from("memberships")
      .select("org_id, role, organizations(*)")
      .eq("user_id", uid);
    if (error) {
      console.error("loadMemberships", error);
      return;
    }
    const rows = (data || []) as unknown as Membership[];
    setMemberships(rows);
    const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    const preferred = rows.find((m) => m.org_id === stored) ?? rows[0];
    if (preferred) _setCurrentOrgId(preferred.org_id);
    else _setCurrentOrgId(null);
  };

  const refresh = async () => {
    if (user) await loadMemberships(user.id);
  };

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        setTimeout(() => loadMemberships(s.user.id), 0);
      } else {
        setMemberships([]);
        _setCurrentOrgId(null);
      }
    });

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) loadMemberships(s.user.id).finally(() => setLoading(false));
      else setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
  };

  const currentMembership = memberships.find((m) => m.org_id === currentOrgId) ?? null;

  return (
    <OrgContext.Provider
      value={{
        user,
        session,
        loading,
        memberships,
        currentOrg: currentMembership?.organizations ?? null,
        currentRole: currentMembership?.role ?? null,
        setCurrentOrgId,
        refresh,
        signOut,
      }}
    >
      {children}
    </OrgContext.Provider>
  );
}

export function useOrg() {
  const ctx = useContext(OrgContext);
  if (!ctx) throw new Error("useOrg must be used within OrgProvider");
  return ctx;
}
