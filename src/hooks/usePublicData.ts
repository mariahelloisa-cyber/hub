import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Course } from "@/data/courses";
import { courses as mockCourses, categoryOptions as mockCategories } from "@/data/courses";

interface DbCourseRow {
  slug: string;
  name: string;
  description: string | null;
  price: number | null;
  duration: string | null;
  workload: string | null;
  area: string | null;
  category_slug: string;
  image_url: string | null;
  highlight: boolean;
  sort_order: number;
  curriculum: string | null;
}

const toCourse = (r: DbCourseRow): Course => ({
  id: r.slug,
  name: r.name,
  description: r.description ?? undefined,
  price: r.price ?? undefined,
  duration: r.duration ?? "",
  workload: r.workload ?? undefined,
  area: r.area ?? undefined,
  category: r.category_slug,
  image: r.image_url ?? undefined,
  highlight: r.highlight,
  curriculum: r.curriculum ?? undefined,
});

/**
 * Lê cursos do banco. Se vazio, retorna o mock embutido como fallback
 * para que o site não quebre antes da importação inicial.
 */
export const usePublicCourses = () => {
  return useQuery({
    queryKey: ["public_courses"],
    queryFn: async (): Promise<Course[]> => {
      const { data, error } = await supabase
        .from("courses")
        .select("slug,name,description,price,duration,workload,area,category_slug,image_url,highlight,sort_order,curriculum")
        .order("sort_order")
        .order("name")
        .limit(2000);
      if (error) throw error;
      if (!data || data.length === 0) return mockCourses;
      return (data as DbCourseRow[]).map(toCourse);
    },
    staleTime: 60_000,
  });
};

export const usePublicCategories = () => {
  return useQuery({
    queryKey: ["public_categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("slug,label,sort_order")
        .order("sort_order");
      if (error) throw error;
      if (!data || data.length === 0) return [...mockCategories] as { slug: string; label: string }[];
      return data.map((c) => ({ slug: c.slug, label: c.label }));
    },
    staleTime: 60_000,
  });
};
