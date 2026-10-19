import { useMemo, useState } from 'react'
import { ArrowLeft, Briefcase, Building2, Factory, Fuel, GraduationCap, Hospital, Search } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { customerCategories } from './config/customers.js'

const categoryIcons = { Factory, Fuel, Hospital, GraduationCap, Briefcase }

function CustomerCategoryCard({ category, onClick }) {
  const Icon = categoryIcons[category.icon]

  return (
    <button className="customer-category-card" type="button" onClick={onClick}>
      <span className="customer-category-icon"><Icon size={22} strokeWidth={1.8} /></span>
      <span className="customer-category-name">{category.name}</span>
      <span className="customer-category-description">{category.description}</span>
      <span className="customer-category-count">{category.customerCount} customers</span>
    </button>
  )
}

function CustomerNameCard({ name }) {
  return (
    <article className="customer-name-card">
      <span className="customer-name-icon"><Building2 size={21} strokeWidth={1.8} aria-hidden="true" /></span>
      <h4>{name}</h4>
    </article>
  )
}

export function CustomerPreview() {
  const previewCategories = customerCategories.slice(0, 3)

  return (
    <div className="customer-preview-grid">
      {previewCategories.map(category => {
        const Icon = categoryIcons[category.icon]

        return (
          <Link
            className="customer-preview-card reveal"
            key={category.id}
            to={`/customers?category=${category.id}`}
          >
            <span className="customer-preview-icon"><Icon size={20} strokeWidth={1.8} /></span>
            <span className="customer-preview-label">{category.name}</span>
            <strong>{category.customerCount} listed</strong>
            <span className="customer-preview-description">{category.description}</span>
          </Link>
        )
      })}
    </div>
  )
}

export default function CustomerDirectory() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const categoryParam = searchParams.get('category')
  const selectedCategory = customerCategories.find(category => category.id === categoryParam)
  const normalizedSearch = searchTerm.trim().toLocaleLowerCase()
  const matchingCategories = useMemo(() => (
    customerCategories
      .map(category => ({
        ...category,
        matchingCustomers: category.customers.filter(customer => (
          customer.toLocaleLowerCase().includes(normalizedSearch)
        )),
      }))
      .filter(category => category.matchingCustomers.length > 0)
  ), [normalizedSearch])

  function selectCategory(categoryId) {
    setSearchTerm('')
    setSearchParams(categoryId ? { category: categoryId } : {})
  }

  return (
    <>
      <div className="customer-directory-controls">
        <label className="customer-search" htmlFor="customer-search">
          <Search size={18} aria-hidden="true" />
          <input
            id="customer-search"
            aria-label="Search approved organization names"
            type="search"
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
            placeholder="Search approved organization names"
            autoComplete="off"
          />
        </label>
        <div className="customer-category-filters" aria-label="Browse customer categories">
          <button
            className={`customer-filter${selectedCategory ? '' : ' is-active'}`}
            type="button"
            aria-pressed={!selectedCategory}
            onClick={() => selectCategory(null)}
          >
            All categories
          </button>
          {customerCategories.map(category => (
            <button
              className={`customer-filter${selectedCategory?.id === category.id ? ' is-active' : ''}`}
              type="button"
              key={category.id}
              aria-pressed={selectedCategory?.id === category.id}
              onClick={() => selectCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {normalizedSearch ? (
        <div className="customer-search-view">
          {selectedCategory && (
            <div className="customer-category-view-heading">
              <h3>Search Results</h3>
              <button className="customer-back-button" type="button" onClick={() => selectCategory(null)}>
                <ArrowLeft size={16} aria-hidden="true" />
                Back to All Categories
              </button>
            </div>
          )}
          {matchingCategories.length ? (
            <div className="customer-search-results">
              {matchingCategories.map(category => (
                <section className="customer-search-category" key={category.id} aria-labelledby={`search-${category.id}`}>
                  <h3 id={`search-${category.id}`}>{category.name}</h3>
                  <div className="customer-name-grid">
                    {category.matchingCustomers.map(customer => <CustomerNameCard key={customer} name={customer} />)}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <p className="customer-no-results" role="status">No approved organization names match your search.</p>
          )}
        </div>
      ) : selectedCategory ? (
        <section className="customer-category-view" aria-labelledby="selected-customer-category">
          <div className="customer-category-view-heading">
            <h3 id="selected-customer-category">{selectedCategory.name}</h3>
            <button className="customer-back-button" type="button" onClick={() => selectCategory(null)}>
              <ArrowLeft size={16} aria-hidden="true" />
              Back to All Categories
            </button>
          </div>
          {selectedCategory.customers.length ? (
            <div className="customer-name-grid">
              {selectedCategory.customers.map(customer => <CustomerNameCard key={customer} name={customer} />)}
            </div>
          ) : (
            <p className="customer-no-results" role="status">Organization names for this category are awaiting approval for public display.</p>
          )}
        </section>
      ) : (
        <div className="customer-category-card-grid">
          {customerCategories.map(category => (
            <CustomerCategoryCard
              key={category.id}
              category={category}
              onClick={() => selectCategory(category.id)}
            />
          ))}
        </div>
      )}
    </>
  )
}
