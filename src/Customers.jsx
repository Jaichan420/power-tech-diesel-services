import C from 'react';
import * as o from 'react/jsx-runtime';
import { Link as we, useSearchParams as vm } from 'react-router-dom';
import { Factory, Fuel, Hospital, GraduationCap, Briefcase, Building2 as Nm, Search as mi, ArrowLeft as Eo, ArrowRight as Be } from 'lucide-react';
import { Navbar as Ao, Footer as Do, WhatsAppButton as zd } from './App.jsx';
import { customerCategories as Kn } from './config/business.js';
const Ld = {
    Factory,
    Fuel,
    Hospital,
    GraduationCap,
    Briefcase
  },
  hv = Ld;
function Wm({
  category: i,
  onClick: u
}) {
  const a = Ld[i.icon];
  return o.jsxs("button", {
    className: "customer-category-card",
    type: "button",
    onClick: u,
    children: [o.jsx("span", {
      className: "customer-category-icon",
      children: o.jsx(a, {
        size: 22,
        strokeWidth: 1.8
      })
    }), o.jsx("span", {
      className: "customer-category-name",
      children: i.name
    }), o.jsx("span", {
      className: "customer-category-description",
      children: i.description
    }), o.jsxs("span", {
      className: "customer-category-count",
      children: [i.customerCount, " customers"]
    })]
  });
}
function Yc({
  name: i
}) {
  return o.jsxs("article", {
    className: "customer-name-card",
    children: [o.jsx("span", {
      className: "customer-name-icon",
      children: o.jsx(Nm, {
        size: 21,
        strokeWidth: 1.8,
        "aria-hidden": "true"
      })
    }), o.jsx("h4", {
      children: i
    })]
  });
}
function Vm() {
  const i = Kn.slice(0, 3);
  return o.jsx("div", {
    className: "customer-preview-grid",
    children: i.map(u => {
      const a = Ld[u.icon];
      return o.jsxs(we, {
        className: "customer-preview-card reveal",
        to: `/customers?category=${u.id}`,
        children: [o.jsx("span", {
          className: "customer-preview-icon",
          children: o.jsx(a, {
            size: 20,
            strokeWidth: 1.8
          })
        }), o.jsx("span", {
          className: "customer-preview-label",
          children: u.name
        }), o.jsxs("strong", {
          children: [u.customerCount, " listed"]
        }), o.jsx("span", {
          className: "customer-preview-description",
          children: u.description
        })]
      }, u.id);
    })
  });
}
function qm() {
  const [i, u] = vm(),
    [a, f] = C.useState(""),
    d = i.get("category"),
    p = Kn.find(E => E.id === d),
    g = a.trim().toLocaleLowerCase(),
    w = C.useMemo(() => Kn.map(E => ({
      ...E,
      matchingCustomers: E.customers.filter(N => N.toLocaleLowerCase().includes(g))
    })).filter(E => E.matchingCustomers.length > 0), [g]);
  function y(E) {
    f(""), u(E ? {
      category: E
    } : {});
  }
  return o.jsxs(o.Fragment, {
    children: [o.jsxs("div", {
      className: "customer-directory-controls",
      children: [o.jsxs("label", {
        className: "customer-search",
        htmlFor: "customer-search",
        children: [o.jsx(mi, {
          size: 18,
          "aria-hidden": "true"
        }), o.jsx("input", {
          id: "customer-search",
          "aria-label": "Search approved organization names",
          type: "search",
          value: a,
          onChange: E => f(E.target.value),
          placeholder: "Search approved organization names",
          autoComplete: "off"
        })]
      }), o.jsxs("div", {
        className: "customer-category-filters",
        "aria-label": "Browse customer categories",
        children: [o.jsx("button", {
          className: `customer-filter${p ? "" : " is-active"}`,
          type: "button",
          "aria-pressed": !p,
          onClick: () => y(null),
          children: "All categories"
        }), Kn.map(E => o.jsx("button", {
          className: `customer-filter${(p == null ? void 0 : p.id) === E.id ? " is-active" : ""}`,
          type: "button",
          "aria-pressed": (p == null ? void 0 : p.id) === E.id,
          onClick: () => y(E.id),
          children: E.name
        }, E.id))]
      })]
    }), g ? o.jsxs("div", {
      className: "customer-search-view",
      children: [p && o.jsxs("div", {
        className: "customer-category-view-heading",
        children: [o.jsx("h3", {
          children: "Search Results"
        }), o.jsxs("button", {
          className: "customer-back-button",
          type: "button",
          onClick: () => y(null),
          children: [o.jsx(Eo, {
            size: 16,
            "aria-hidden": "true"
          }), "Back to All Categories"]
        })]
      }), w.length ? o.jsx("div", {
        className: "customer-search-results",
        children: w.map(E => o.jsxs("section", {
          className: "customer-search-category",
          "aria-labelledby": `search-${E.id}`,
          children: [o.jsx("h3", {
            id: `search-${E.id}`,
            children: E.name
          }), o.jsx("div", {
            className: "customer-name-grid",
            children: E.matchingCustomers.map(N => o.jsx(Yc, {
              name: N
            }, N))
          })]
        }, E.id))
      }) : o.jsx("p", {
        className: "customer-no-results",
        role: "status",
        children: "No approved organization names match your search."
      })]
    }) : p ? o.jsxs("section", {
      className: "customer-category-view",
      "aria-labelledby": "selected-customer-category",
      children: [o.jsxs("div", {
        className: "customer-category-view-heading",
        children: [o.jsx("h3", {
          id: "selected-customer-category",
          children: p.name
        }), o.jsxs("button", {
          className: "customer-back-button",
          type: "button",
          onClick: () => y(null),
          children: [o.jsx(Eo, {
            size: 16,
            "aria-hidden": "true"
          }), "Back to All Categories"]
        })]
      }), p.customers.length ? o.jsx("div", {
        className: "customer-name-grid",
        children: p.customers.map(E => o.jsx(Yc, {
          name: E
        }, E))
      }) : o.jsx("p", {
        className: "customer-no-results",
        role: "status",
        children: "Organization names for this category are awaiting approval for public display."
      })]
    }) : o.jsx("div", {
      className: "customer-category-card-grid",
      children: Kn.map(E => o.jsx(Wm, {
        category: E,
        onClick: () => y(E.id)
      }, E.id))
    })]
  });
}
function mv() {
  return o.jsx("section", {
    className: "customer-experience section-pad",
    id: "industries-served",
    children: o.jsxs("div", {
      className: "wrap customer-experience-grid",
      children: [o.jsxs("div", {
        className: "customer-experience-copy reveal",
        children: [null, o.jsx("h2", {
          children: "Experience since 2014"
        }), o.jsx("p", {
          children: "Power Tech Diesel Services supports businesses and institutions with dependable generator servicing and maintenance. The categories and counts reflect entries in our customer directory."
        }), o.jsxs(we, {
          className: "button button-light",
          to: "/#quote",
          children: ["Request a Callback ", o.jsx(Be, {
            size: 16
          })]
        })]
      }), o.jsx("div", {
        className: "customer-experience-list reveal",
        children: Kn.map(i => {
          const u = hv[i.icon];
          return o.jsxs("article", {
            className: "customer-experience-item",
            children: [o.jsx("span", {
              className: "customer-experience-icon",
              children: o.jsx(u, {
                size: 18,
                strokeWidth: 1.8
              })
            }), o.jsx("h3", {
              children: i.name
            }), o.jsx("strong", {
              children: i.customerCount
            })]
          }, i.id);
        })
      })]
    })
  });
}
function vv() {
  return C.useEffect(() => {
    const i = new IntersectionObserver(u => {
      u.forEach(a => {
        a.isIntersecting && (a.target.classList.add("is-visible"), i.unobserve(a.target));
      });
    }, {
      threshold: .12
    });
    return document.querySelectorAll(".customers-page .reveal").forEach(u => i.observe(u)), () => i.disconnect();
  }, []), o.jsxs(o.Fragment, {
    children: [o.jsx(Ao, {}), o.jsxs("main", {
      className: "customers-page",
      children: [o.jsx("section", {
        className: "customers-page-hero",
        id: "customers",
        children: o.jsxs("div", {
          className: "wrap customers-page-hero-inner",
          children: [null, o.jsx("h1", {
            className: "reveal",
            children: "Our Valued Customers"
          }), o.jsx("p", {
            className: "customers-page-subtitle reveal",
            children: "Serving businesses and institutions across diverse sectors with dependable diesel generator servicing and maintenance."
          }), o.jsx("p", {
            className: "customers-page-intro reveal",
            children: "Since 2014, Power Tech Diesel Services has served customers across multiple industries. Customer organization names are shown only after approval for public display."
          })]
        })
      }), o.jsx("section", {
        className: "customer-directory-section section-pad",
        "aria-labelledby": "customer-directory-title",
        children: o.jsxs("div", {
          className: "wrap",
          children: [o.jsxs("div", {
            className: "section-heading reveal",
            children: [null, o.jsx("h2", {
              id: "customer-directory-title",
              children: "Our customer directory"
            }), o.jsx("p", {
              className: "section-description",
              children: "Choose any category to browse its customer organizations, or search approved organization names across all categories. Residential customers are not included."
            })]
          }), o.jsx(qm, {})]
        })
      }), o.jsx(mv, {}), o.jsx("section", {
        className: "customers-page-cta",
        children: o.jsxs("div", {
          className: "wrap customers-page-cta-inner reveal",
          children: [o.jsxs("div", {
            children: [null, o.jsx("h2", {
              children: "Plan your next service."
            }), o.jsx("p", {
              children: "Tell us about your business and generator requirements. Our team will follow up about your enquiry."
            })]
          }), o.jsxs(we, {
            className: "button button-navy",
            to: "/#quote",
            children: ["Request a Callback ", o.jsx(Be, {
              size: 16
            })]
          })]
        })
      })]
    }), o.jsx(Do, {}), o.jsx(zd, {})]
  });
}
export { Vm as CustomerPreview };
export default vv;
