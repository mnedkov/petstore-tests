Feature: Test that all basic Create/Update/Delete functions for pets work properly

  Scenario: Create a new Pet
    When I create a pet with name "<PetName>" and category "<PetCategory>"
    Then the pet will be created successfully
    When I retrieve the pet by its id
    Then its name will match "<PetName>" 
     And its category will match "<PetCategory>"

    Examples:
      | PetName | PetCategory |
      | Sunny   | Dog         |

  Scenario: Update a Pet
    Given a pet with name "<PetName>" 
    When I update its name to "<NewPetName>"
     And I retrieve the pet by its id
    Then its name will match "<NewPetName>" 
      
    Examples:
      | PetName | NewPetName |
      | Sunny   | Bunny      |

  Scenario: Delete a Pet
    Given a pet with name "<PetName>" 
    When I delete the pet
     And I retrieve the pet by its id
    Then I will get an error "Pet not found"
      
    Examples:
      | PetName | 
      | Tara    |