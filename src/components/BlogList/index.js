import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import BlogItem from '../BlogItem'
import './index.css'

class BlogsList extends Component {
  state = {
    isLoading: true,
    blogsData: [],
  }

  componentDidMount() {
    this.fetchBlogData()
  }

  fetchBlogData = async () => {
    try {
      const response = await fetch('https://apis.ccbp.in/blogs')
      if (response.ok) {
        const data = await response.json()
        const formattedData = data.map(eachItem => ({
          id: eachItem.id,
          title: eachItem.title,
          imageUrl: eachItem.image_url,
          avatarUrl: eachItem.avatar_url,
          author: eachItem.author,
          topic: eachItem.topic,
        }))
        this.setState({blogsData: formattedData, isLoading: false})
      } else {
        throw new Error('Failed to fetch blogs')
      }
    } catch (error) {
      console.error('Error fetching blogs data:', error)
      this.setState({isLoading: false})
    }
  }

  render() {
    const {blogsData, isLoading} = this.state

    return (
      <div className="blog-list-container">
        <div data-testid="loader">
          {isLoading ? (
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          ) : (
            blogsData.map(blog => (
              <Link key={blog.id} to={`/blogs/${blog.id}`}>
                <BlogItem blogData={blog} />
              </Link>
            ))
          )}
        </div>
      </div>
    )
  }
}

export default BlogsList
