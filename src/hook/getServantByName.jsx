import { useEffect, useState } from "react";
import { getServant } from "../api/servantServices";
import { getServantRoles, classifyServantRoles } from "../logic/ServantData.js";

export default function getServantByName(name) {
  const [servant, setServant] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!name || name.trim().length < 2) {
      setServant([]);
      return;
    }

    let isMounted = true;

    const fetchServant = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getServant(name);

        if (isMounted && data.length > 0) {
          const results = data.slice(0, 10);

          const mapped = results.map((s) => {
            const roleTotal = classifyServantRoles(s);
            const role = getServantRoles(roleTotal);

            return {
              id: s.id,
              name: s.name,
              class: s.className,
              rarity: s.rarity,
              cardType: "",
              role: role,
              skills: s.skills?.map((skill) => skill.name) ?? [],
              np: s.noblePhantasms?.[0]?.name ?? "",
              passives: s.classPassive?.map((p) => p.name) ?? [],
              image: s.extraAssets?.charaGraph?.ascension?.[4] ?? "",
            };
          });

          setServant(mapped);
        } else if (isMounted) {
          setServant([]);
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchServant();

    return () => {
      isMounted = false;
    };
  }, [name]);

  return { servant, loading, error };
}
