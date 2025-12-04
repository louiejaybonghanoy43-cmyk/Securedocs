import os
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def test_delete_folder_with_contents():
    """
    Test case to create a folder with a file, and then delete the folder.
    """
    try:
        # Setup WebDriver
        wdm_path = ChromeDriverManager().install()
        driver_path = os.path.join(os.path.dirname(wdm_path), "chromedriver.exe")
        driver = webdriver.Chrome(service=ChromeService(driver_path))
        driver.get("https://securedocs.live")
        driver.maximize_window()
        time.sleep(2)

        # Login
        WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//a[@href='/login']"))).click()
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "email"))).send_keys("louiejaybonghanoy43@gmail.com")
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "password"))).send_keys("Star183795!")
        driver.find_element(By.XPATH, "//button[text()='LOGIN']").click()
        WebDriverWait(driver, 10).until(EC.url_contains("/dashboard"))

        # --- Create Folder ---
        folder_name = f"FolderWithFile_{int(time.time())}"
        create_folder(driver, folder_name)
        print(f"Folder '{folder_name}' created successfully.")

        # --- Upload File to Folder ---
        # Open the folder
        folder_element = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, f"//div[@data-item-name='{folder_name}']")))
        folder_element.click()
        time.sleep(1)
        open_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//div[@id='selectionToolbar']//button[.//span[text()='Open']]")))
        open_button.click()
        time.sleep(3)

        # Upload the file
        upload_file(driver, "dummy_file.txt")
        print("File uploaded successfully.")

        # Go back to the parent directory
        driver.back()
        time.sleep(3)

        # --- Delete Folder ---
        # Select the folder
        folder_element = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, f"//div[@data-item-name='{folder_name}']")))
        folder_element.click()
        time.sleep(1)

        # Click the "Delete" button
        delete_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//div[@id='selectionToolbar']//button[.//span[text()='Delete']]")))
        delete_button.click()
        time.sleep(1)

        # Confirm the deletion
        confirm_delete_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//button[text()='Delete']")))
        confirm_delete_button.click()
        time.sleep(3)
        print(f"Folder '{folder_name}' deleted successfully.")

    except Exception as e:
        print(f"Test failed: {e}")
        import traceback
        traceback.print_exc()

    finally:
        if 'driver' in locals():
            driver.quit()

def create_folder(driver, folder_name):
    # Click the "Add" button to show the dropdown
    add_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//div[@id='newBtn']")))
    add_button.click()
    time.sleep(1)

    # Click the "New Folder" option from the dropdown
    new_folder_option = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//div[@id='createFolderOption']")))
    new_folder_option.click()
    time.sleep(1)

    # Enter folder name
    folder_name_input = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Enter here']")))
    folder_name_input.send_keys(folder_name)
    time.sleep(1)

    # Click "Create" button
    create_folder_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//button[text()='Create Folder']")))
    create_folder_button.click()
    time.sleep(5) # Wait for folder to be created and page to update

def upload_file(driver, file_name):
    # Click the "Add" button to show the dropdown
    add_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//div[@id='newBtn']")))
    add_button.click()
    time.sleep(1)

    # Click the "Upload File" option from the dropdown
    upload_file_option = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//div[@id='uploadFileOption']")))
    upload_file_option.click()
    time.sleep(1)

    # Upload the file
    file_input = driver.find_element(By.ID, "fileInput")
    file_path = os.path.abspath(file_name)
    file_input.send_keys(file_path)
    time.sleep(1)

    # Click the "Upload" button
    upload_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, "uploadBtn")))
    upload_button.click()
    time.sleep(5) # Wait for upload to complete

if __name__ == "__main__":
    test_delete_folder_with_contents()