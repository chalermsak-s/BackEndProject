<script setup lang="ts">
import StudentService from '@/services/StudentService'
import { ref, onMounted } from 'vue'
import type { Student } from '@/types'
import { useAuthStore } from '@/stores/auth'

const student = ref<Student | null>(null) // เก็บข้อมูลนักศึกษาเพียงคนเดียว
const loading = ref<boolean>(true)
const authStore = useAuthStore()
const error = ref<string | null>(null) // To store error messages
const fetchStudent = async () => {
  try {
    if (authStore.user?.id !== null && authStore.user?.id !== undefined) {
      const response = await StudentService.getStudent(authStore.user.id)
      if (response.data.length > 0) {
        student.value = response.data[0] // ดึงเฉพาะนักศึกษาคนแรก
      }
    } else {
      throw new Error('User ID is not available')
    }
  } catch (err) {
    error.value =
      'Error fetching student: ' + (err instanceof Error ? err.message : err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchStudent)
</script>

<template>
  
  <div class="container mx-auto p-4">
    <div class="flex flex-col md:flex-row gap-4">
      <!-- Profile Sidebar -->
      <div class="w-full md:w-1/3">
        <div class="card bg-base-100 shadow-xl p-4">
          <figure class="px-10 pt-10">
            <img
              src="https://bootdey.com/img/Content/avatar/avatar3.png"
              alt="Profile Picture"
              class="rounded-full w-24 h-24"
            />
          </figure>
          <div class="card-body items-center text-center" >
            <h2 class="card-title">999</h2>
            <p>deydey@theEmail.com</p>
            <div class="divider"></div>
            <ul class="menu bg-base-200 w-full rounded-box">
              <li class="bg-primary text-white">
                <a><i class="fa fa-user"></i> Profile</a>
              </li>
              <li>
                <a
                  ><i class="fa fa-calendar"></i> Recent Activity
                  <span class="badge badge-warning">9</span></a
                >
              </li>
              <li>
                <a><i class="fa fa-edit"></i> Edit Profile</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Profile Content -->
      <div class="w-full md:w-2/3">
        <div class="card bg-base-100 shadow-xl p-4">
          <textarea
            class="textarea textarea-bordered w-full"
            placeholder="What's on your mind today?"
          ></textarea>
          <div class="card-actions justify-between mt-2">
            <div>
              <button class="btn btn-warning">Post</button>
            </div>
            <div class="flex space-x-2">
              <button class="btn btn-ghost btn-circle">
                <i class="fa fa-map-marker"></i>
              </button>
              <button class="btn btn-ghost btn-circle">
                <i class="fa fa-camera"></i>
              </button>
              <button class="btn btn-ghost btn-circle">
                <i class="fa fa-film"></i>
              </button>
              <button class="btn btn-ghost btn-circle">
                <i class="fa fa-microphone"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="card bg-base-100 shadow-xl p-4 mt-4">
          <div class="card-body">
            <h2 class="card-title">Bio Graph</h2>
            <div class="grid grid-cols-2 gap-4">
              <p><span class="font-bold">First Name:</span> Camila</p>
              <p><span class="font-bold">Last Name:</span> Smith</p>
              <p><span class="font-bold">Country:</span> Australia</p>
              <p><span class="font-bold">Birthday:</span> 13 July 1983</p>
              <p><span class="font-bold">Occupation:</span> UI Designer</p>
              <p><span class="font-bold">Email:</span> jsmith@flatlab.com</p>
              <p><span class="font-bold">Mobile:</span> (12) 03 4567890</p>
              <p><span class="font-bold">Phone:</span> 88 (02) 123456</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div class="card bg-base-100 shadow-xl p-4 text-center">
            <div
              class="radial-progress text-red-500"
              style="--value: 35"
              role="progressbar"
            >
              35%
            </div>
            <h4 class="font-bold">Envato Website</h4>
            <p>Started: 15 July</p>
            <p>Deadline: 15 August</p>
          </div>
          <div class="card bg-base-100 shadow-xl p-4 text-center">
            <div
              class="radial-progress text-blue-500"
              style="--value: 63"
              role="progressbar"
            >
              63%
            </div>
            <h4 class="font-bold">ThemeForest CMS</h4>
            <p>Started: 15 July</p>
            <p>Deadline: 15 August</p>
          </div>
          <div class="card bg-base-100 shadow-xl p-4 text-center">
            <div
              class="radial-progress text-green-500"
              style="--value: 75"
              role="progressbar"
            >
              75%
            </div>
            <h4 class="font-bold">VectorLab Portfolio</h4>
            <p>Started: 15 July</p>
            <p>Deadline: 15 August</p>
          </div>
          <div class="card bg-base-100 shadow-xl p-4 text-center">
            <div
              class="radial-progress text-purple-500"
              style="--value: 50"
              role="progressbar"
            >
              50%
            </div>
            <h4 class="font-bold">Adobe Muse Template</h4>
            <p>Started: 15 July</p>
            <p>Deadline: 15 August</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
